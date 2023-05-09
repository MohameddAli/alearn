// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import InstructorRoute from '../../components/routes/InstructorRoute';
// import { Avatar } from 'antd';
// import Link from 'next/link';
// import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// const InstructorIndex = () => {
//   const [courses, setCourses] = useState([]); // empty array
//   // const [basePath, setBasePath] = useState('');

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   // const loadCourses = async () => {
//   //   const { data } = await axios.get("/api/instructor-courses");
//   //   console.log('loadCourses data:', data);
//   //   setCourses(data);
//   // };
//   const loadCourses = async () => {
//     try {
//       const { data } = await axios.get("/api/instructor-courses");
//       console.log('loadCourses data:', data);
//       setCourses(data);
//     } catch (err) {
//       console.error('Failed to load courses:', err);
//     }
//   };

//   const myStyle = { marginTop: "-15px", fontSize: "11px", curser: "pointer" };
//   //  const basePath = "http://localhost:8000";
//   return (
//     <InstructorRoute>
//         <h1 className='jumbotron text-center square p-5'>
//         Instructor Dashboard
//         </h1>
//         {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

//         {courses && courses.map((course) => (
//           <>
//             <div className="media pt-2">
//             {console.log("image path", course.image && course.image.fileName)}
//               {/* <Avatar 
//                 size={80} 
//                 // src={course.image ? course.image.filePath : "/course.png"}
//                 src={course.image ? `/images/${course.image.fileName}` : "/course.png"}
//               /> */}
//               {/* <Avatar 
//                 size={80} 
//                 // src={course.image ? `/images/${course.image.fileName}` : "/course.png"}
//                 src={course.image ? course.image.fileName : "/course.png"} 
//               /> */}
//               <Avatar 
//                 size={80} 
//                 src={course.image ? `/images/${course.image.fileName}` : "/course.png"}
//               />

//               <div className="media-body pl-2">
//                 <div className="row">
//                   <div className="col">
//                     <Link legacyBehavior href={`/instructor/course/view/${course._id}`} className='pointer'>
//                       <a className='mt-2 text-primary' ><h5 className='pt-2'>{course.name}</h5></a>
//                     </Link>
//                     <p style={{ marginTop: "-10px" }}>
//                       {course.lessons.length} Lessons
//                     </p>

//                     {course.lessons.length < 5 ? (
//                       <p style={myStyle} className='text-warning'>
//                         At least 5 lessons are required to publish a course
//                       </p>
//                     ) : course.published ? (
//                       <p style={myStyle} className='text-success'>Your course is live in the marketplace</p>
//                     ) : (
//                       <p style={myStyle} className='text-success'>Your course is ready to be published</p>
//                     )}
//                   </div>

//                   <div className='col-md-3 mt-3 text-center'>
//                     {course.published ? (
//                       <div>
//                         <CheckCircleOutlined 
//                           className='h5 pointer text-success'
//                         />
//                       </div>
//                     ) : (
//                       <div>
//                         <CloseCircleOutlined 
//                           className='h5 pointer text-warning'
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         ))}
//     </InstructorRoute>
//   )
// }

// export default InstructorIndex;

import { useState, useEffect } from 'react';
import axios from 'axios';
import InstructorRoute from '../../components/routes/InstructorRoute';
import { Avatar } from 'antd';
import Link from 'next/link';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]); // empty array

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await axios.get("/api/instructor-courses");
      console.log('loadCourses data:', data);
      setCourses(data);
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const myStyle = { marginTop: "-15px", fontSize: "11px", cursor: "pointer" };

  return (
    <InstructorRoute>
      <h1 className='jumbotron text-center square p-5'>
        Instructor Dashboard
      </h1>
      {courses && courses.map((course) => (
        <div key={course._id} className="media pt-2">
          {console.log("image path", course.image && course.image.fileName)}
          <Avatar
            size={80}
            src={course.image ? `/images/${course.image.fileName}` : "/course.png"}
          />

          <div className="media-body pl-2">
            <div className="row">
              <div className="col">
                <Link legacyBehavior href={`/instructor/course/view/${course._id}`} >
                  <a className='mt-2 text-primary'><h5 className='pt-2'>{course.name}</h5></a>
                </Link>
                <p style={{ marginTop: "-10px" }}>
                  {course.lessons.length} Lessons
                </p>

                {course.lessons.length < 5 ? (
                  <p style={myStyle} className='text-warning'>
                    At least 5 lessons are required to publish a course
                  </p>
                ) : course.published ? (
                  <p style={myStyle} className='text-success'>Your course is live in the marketplace</p>
                ) : (
                  <p style={myStyle} className='text-success'>Your course is ready to be published</p>
                )}
              </div>

              <div className='col-md-3 mt-3 text-center'>
                {course.published ? (
                  <div>
                    <CheckCircleOutlined
                      className='h5 pointer text-success'
                    />
                  </div>
                ) : (
                  <div>
                    <CloseCircleOutlined
                      className='h5 pointer text-warning'
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </InstructorRoute>
  )
}

export default InstructorIndex;