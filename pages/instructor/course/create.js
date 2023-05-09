import { useState } from 'react';
import axios from 'axios';
import InstructorRoute from '../../../components/routes/InstructorRoute';
import CourseCreateForm from '../../../components/forms/CourseCreateForm';
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const createCourse = () => {
  // state
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '9.99',
        uploading: false,
        paid: true,
        category: '',
        loading: false,
        imagePreview: ''
    });
    const [image, setImage] = useState({}); // empty obj for image
    const [preview, setPreview] = useState('');
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
    // router
    const router = useRouter();

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value});
    };
    
    // const handleImage = (e) => {
    //   let file = e.target.files[0];
    //   setPreview(window.URL.createObjectURL(file));
    //   setUploadButtonText(file.name);
    //   setValues({ ...values, loading: true });
    //   console.log("Image 1", file.name);
    //   const formData = new FormData();
    //   formData.append("image", file); // append the file to FormData
    //   console.log("Image2" );
    //   axios
    //     .post("/api/course/upload-image", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((res) => {
    //       console.log("Image upload response data", res.data);
    //       // set image in the state
    //       setImage(res.data);
    //       setValues({ ...values, loading: false });
    //     })
    //     .catch((err) => {
    //       console.log("Image handle: ", err);
    //       setValues({ ...values, loading: false });
    //       toast("Image upload failed. Try later.", err.response.data);
    //     });
    // };
    const handleImage = (e) => {
      let file = e.target.files[0];
      setPreview(window.URL.createObjectURL(file));
      setUploadButtonText(file.name);
      setValues({ ...values, loading: true });
      console.log("Image 1", file.name);
      const formData = new FormData();
      formData.append("image", file); // append the file to FormData
      console.log("Image2" );
      axios
        .post("/api/course/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Image upload response data", res.data);
          // set image in the state
          setImage(res.data);
          setValues({ ...values, loading: false });
        })
        .catch((err) => {
          console.log("Image handle: ", err);
          setValues({ ...values, loading: false });
          toast("Image upload failed. Try later.", err.response.data);
        });
    };
    
    
    const handleImageRemove = async () => {  
      try {
        console.log('handleImageRemove');
        setValues({ ...values, loading: true });
        const res = await axios.post('/api/course/remove-image', { image });
        setImage({});
        setPreview('');
        setUploadButtonText('Upload Image');
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log("handleImageRemove error", err);
        setValues({ ...values, loading: false });
        toast.error("Image removal failed. Please try again later.");
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
        try {
        // console.log(values);
        const { data } = await axios.post('/api/course', {
          ...values, 
          image
        });
        toast('Great! Now you can start adding lessons');
        router.push("/instructor")
      } catch (err) {
        toast(err.response.data);
      }
    };


  return (
    <InstructorRoute>
        <h1 className='jumbotron text-center square p-5'>
            Create Course
        </h1>
        <div  className='pt-3 pb-3'>
            <CourseCreateForm
              handleSubmit={handleSubmit}
              handleImage={handleImage}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              preview={preview}
              uploadButtonText={uploadButtonText}
              handleImageRemove={handleImageRemove}
            />
        </div>
        <pre>{JSON.stringify(values, null, 4)}</pre>
        <hr />
        <pre>{JSON.stringify(image, null, 4)}</pre>
    </InstructorRoute>
  )
}

export default createCourse