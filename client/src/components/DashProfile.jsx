import { Alert, Button, TextInput } from 'flowbite-react'
import { useState, useRef, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firbase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const DashProfile = () => {
  const {currentUser}  = useSelector(state=> state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const filePickerRef = useRef()
 

  console.log(imageUploadProgress, imageUploadError)
  const handleImageChange =(e) => {
    const file = e.target.files[0]
    if(file){
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }
  useEffect(()=>{
    if(imageFile){
      uploadImage();
     }
  },[imageFile])

  const uploadImage = async ()=> {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow rea; 
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
     console.log('uploading image...')
      setImageUploadError(null)
     const storage = getStorage(app)
     const fileName = new Date().getTime()+ imageFile.name
     const storageRef = ref(storage, fileName)
     const uploadTask = uploadBytesResumable(storageRef, imageFile)
     uploadTask.on(
      'state_changed',
      (snapshot)=>{
          const progress =
           (snapshot.bytesTransferred / snapshot.totalBytes)* 100
           setImageUploadProgress(progress.toFixed(0))
      },
       (error)=>{
          setImageUploadError('Could not upload image (file must be less than 2MB')
          setImageUploadProgress(null)
          setImageFile(null)
          setImageFileUrl(null)
        },
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL)
        })
      }
     )
    }
  console.log(imageFile)
  console.log(imageFileUrl)

  const handleUpdateProfile = ()=> {
     
  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input hidden type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef}/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
           {imageUploadProgress&&(
            <CircularProgressbar
              value={imageUploadProgress||0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:0,
                  left:0
                },
                path:{
                  stroke:`rgba(62, 152, 199, ${imageUploadProgress/100})`
                },
              }}
            />
           )}
          <img src={imageFileUrl || currentUser.profilePicture} alt='user'
          className={`rounded-full w-full h-full border-8 border-[lightgray] ${imageUploadProgress&&imageUploadProgress<100 && 'opacity-60'}`}
          />
        </div>
        {imageUploadError&&<Alert color='failure'>{imageUploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' 
          defaultValue={currentUser.username}
          />
        <TextInput type='email' id='email' placeholder='email' 
          defaultValue={currentUser.email}
          />
          <TextInput type='password' id='password' placeholder='password' 
          />
          <Button type='submit' gradientDuoTone='purpleToBlue' outline onClick={handleUpdateProfile}>
            Update
          </Button>
      
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
         <span className='cursor-pointer'>Delete Account</span>
         <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile