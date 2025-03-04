// import React, { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Navbar from "@/components/Shared/Navbar";
// import axios from "axios";
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/util/constant";
// import { setSingleJob } from "@/Redux/JobSlice";
// import { toast } from "sonner";

// const JobDescription = () => {
//   const { singleJob } = useSelector((store) => store.job);
//   const { user } = useSelector((store) => store.auth);
//   const isInitiallyApplied =
//     singleJob?.applications?.some(
//       (application) => application.applicant === user?._id
//     ) || false;
//   // const [isApplied, setIsApplied] = useState(isInitiallyApplied);

//   const [isApplied, setIsApplied] = useState(
//     () =>
//       //added
//       singleJob?.applications?.some((app) => app.applicant === user?._id) ||
//       false
//   );

//   const params = useParams();
//   const jobId = params.id;
//   const dispatch = useDispatch();

//     const handleSubmitAudition = () => {
//       // Handle submission logic here
//       console.log('Submitting audition:', { videoFile, auditionScript });
//     };

//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         setIsApplied(true);
//         const updatedSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updatedSingleJob));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to apply");
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           console.log(res.data.job);
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === user?._id
//             )
//           );
//         }
//       } catch (error) {
//         toast.error("Failed to fetch job details");
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//   const handleVideoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Check file size (15MB limit)
//     if (file.size > 15 * 1024 * 1024) {
//       toast.error("Video size must be less than 15MB");
//       return;
//     }

//     try {
//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append('video', file);
//       formData.append('jobId', jobId);

//       const res = await axios.post(
//         `${APPLICATION_API_END_POINT}/upload-audition`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("Video uploaded successfully");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to upload video");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const renderField = (label, value) => {
//     if (!value && value !== 0) return null;
//     return (
//       <h1 className="font-bold my-1">
//         {label}: <span className="pl-4 font-normal text-gray-800">{value}</span>
//       </h1>
//     );
//   };

//   const renderRangeField = (label, min, max, unit = "") => {
//     if (!min && !max) return null;
//     return (
//       <h1 className="font-bold my-1">
//         {label}:{" "}
//         <span className="pl-4 font-normal text-gray-800">
//           {min} - {max}
//           {unit}
//         </span>
//       </h1>
//     );
//   };

//   const renderArrayField = (label, array) => {
//     if (!array?.length) return null;
//     return (
//       <h1 className="font-bold my-1">
//         {label}:{" "}
//         <span className="pl-4 font-normal text-gray-800">
//           {array.join(", ")}
//         </span>
//       </h1>
//     );
//   };

//   return (
//     <div className="bg-main-bg min-h-screen">
//       <div className="bg-overlay-bg min-h-screen">
//         <Navbar />
//         <div className="max-w-7xl mx-auto mt-10 rounded-2xl bg-white py-8 px-6 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="font-bold text-2xl text-gray-900">
//                 {singleJob?.title}
//               </h1>
//               <div className="flex flex-wrap items-center gap-3 mt-4">
//                 <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
//                   {singleJob?.projectType}
//                 </Badge>
//                 <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
//                   {singleJob?.roleType}
//                 </Badge>
//                 <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
//                   ₹{singleJob?.salaryPerDay}/day
//                 </Badge>
//               </div>
//             </div>

//             <Button
//               onClick={isApplied ? null : applyJobHandler}
//               disabled={isApplied}
//               className={`rounded-lg px-6 py-2 text-lg font-semibold transition ${
//                 isApplied
//                   ? "bg-gray-300 text-gray-700 cursor-default"
//                   : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
//               }`}
//             >
//               {isApplied ? "Already Applied" : "Apply Now"}
//             </Button>
//           </div>

//           {/* Job Description */}
//           <h1 className="border-b-2 border-b-gray-300 font-semibold text-lg py-4 text-gray-800">
//             Job Description
//           </h1>

//           <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
//             {renderField("Project", singleJob?.title)}
//             {renderField("Description", singleJob?.description)}
//             {renderField("Project Type", singleJob?.projectType)}
//             {renderField("Sub Project Type", singleJob?.subProjectType)}
//             {renderArrayField("Genres", singleJob?.subGenres)}
//             {renderField("Role Type", singleJob?.roleType)}
//             {renderField("Role Name", singleJob?.roleName)}
//             {renderField("Gender", singleJob?.gender)}
//             {renderRangeField(
//               "Age",
//               singleJob?.age?.min,
//               singleJob?.age?.max,
//               " years"
//             )}
//             {renderRangeField(
//               "Height",
//               singleJob?.height?.min,
//               singleJob?.height?.max,
//               " cm"
//             )}
//             {renderRangeField(
//               "Weight",
//               singleJob?.weight?.min,
//               singleJob?.weight?.max,
//               " kg"
//             )}
//             {renderField("Skills Required", singleJob?.skills)}
//             {renderField("Role Description", singleJob?.roleDescription)}
//             {renderArrayField(
//               "Media Requirements",
//               singleJob?.mediaRequirement
//             )}
//             {renderField("Salary Per Day", `₹${singleJob?.salaryPerDay}`)}
//             {renderField(
//               "Expected Work Hours",
//               `${singleJob?.expectedWorkHours} hours`
//             )}
//             {renderField(
//               "Expected Completion Time",
//               singleJob?.expectedCompletionTime
//             )}
//             {renderField(
//               "Audition Type",
//               singleJob?.specialSubmissionAuditions
//             )}
//           </div>

//           {/* Company Details */}
//           <div className="mt-6 bg-gray-100 p-5 shadow-purple-300 shadow-lg rounded-lg">
//             <h2 className="font-semibold text-lg mb-3">🏢 Company Details</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {renderField("Company", singleJob?.company?.name)}
//               {renderField(
//                 "Posted Date",
//                 singleJob?.createdAt
//                   ? new Date(singleJob.createdAt).toLocaleDateString()
//                   : null
//               )}
//               {renderField(
//                 "Total Applications",
//                 singleJob?.applications?.length
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Shared/Navbar";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/util/constant";
import { setSingleJob } from "@/Redux/JobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("auditionVideo", videoFile); // Append video file to FormData

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data.job);
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        toast.error("Failed to fetch job details");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // const handleVideoUpload = async (e) => {

  // const file = e.target.files[0];
  // if (!file) return;

  // // Check file size (15MB limit)
  // if (file.size > 15 * 1024 * 1024) {
  //   toast.error("Video size must be less than 15MB");
  //   return;
  // }

  //   try {
  // setIsUploading(true);
  // const formData = new FormData();
  // // Use the field name "auditionVideo" as defined in your multer config
  // formData.append("auditionVideo", file);

  //     const res = await axios.post(
  //       `${APPLICATION_API_END_POINT}/${jobId}/upload-audition`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (res.data.success) {
  //       toast.success("Video uploaded successfully");
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to upload video");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // Cloudinary Widget for video upload
  // Cloudinary Widget for video upload
  // const cloudinaryWidget = () => {
  //   window.cloudinary.openUploadWidget(
  //     {
  //       cloud_name: "dk3kctcbh", // Replace with your Cloudinary cloud name
  //       uploadPreset: "videoPre", // Replace with your Cloudinary upload preset
  //       resource_type: "video",
  //       multiple: false, // Ensure only one file can be uploaded
  //       maxFileSize: 15 * 1024 * 1024, // Max file size (15MB)
  //       sources: ["local", "url", "camera"], // Allow uploading from different sources
  //     },
  //     (error, result) => {
  //       if (error) {
  //         toast.error("Failed to upload video: " + error.message);
  //       } else {
  //         if (result && result[0] && result[0].secure_url) {
  //           applyJobWithVideo(result[0].secure_url); // Send the URL to applyJobWithVideo
  //         } else {
  //           toast.error("Video upload failed. No video URL returned.");
  //         }
  //       }
  //     }
  //   );
  // };

  // // Apply job with the uploaded video URL
  // const applyJobWithVideo = async (videoUrl) => {
  //   if (!videoUrl) {
  //     toast.error("No video URL provided.");
  //     return;
  //   }

  //   try {
  //     setIsUploading(true);
  //     const formData = new FormData();
  //     // Send Cloudinary video URL directly to the backend
  //     formData.append("videoUrl", videoUrl);

  //     const res = await axios.post(
  //       `${APPLICATION_API_END_POINT}/${jobId}/upload-audition`,
  //       { videoUrl },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     if (res.data.success) {
  //       setIsApplied(true);
  //       const updatedSingleJob = {
  //         ...singleJob,
  //         applications: [
  //           ...singleJob.applications,
  //           { applicant: user?._id, videoUrl }, // Store the Cloudinary URL in the application
  //         ],
  //       };
  //       dispatch(setSingleJob(updatedSingleJob));
  //       toast.success(res.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to apply");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // Handle Video Upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (15MB limit)
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Video size must be less than 15MB");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("auditionVideo", file);

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/${jobId}/upload-audition`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Video uploaded successfully");
        setIsVideoUploaded(true); // Set video upload status to true
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  const renderField = (label, value) => {
    if (!value && value !== 0) return null;
    return (
      <h1 className="font-bold my-1">
        {label}: <span className="pl-4 font-normal text-gray-800">{value}</span>
      </h1>
    );
  };

  const renderRangeField = (label, min, max, unit = "") => {
    if (!min && !max) return null;
    return (
      <h1 className="font-bold my-1">
        {label}:{" "}
        <span className="pl-4 font-normal text-gray-800">
          {min} - {max}
          {unit}
        </span>
      </h1>
    );
  };

  const renderArrayField = (label, array) => {
    if (!array?.length) return null;
    return (
      <h1 className="font-bold my-1">
        {label}:{" "}
        <span className="pl-4 font-normal text-gray-800">
          {array.join(", ")}
        </span>
      </h1>
    );
  };

  return (
    <div className="bg-main-bg min-h-screen">
      <div className="bg-overlay-bg min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto mt-10 rounded-2xl bg-white py-8 px-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl text-gray-900">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  {singleJob?.projectType}
                </Badge>
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  {singleJob?.roleType}
                </Badge>
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  ₹{singleJob?.salaryPerDay}/day
                </Badge>
              </div>
            </div>

            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg px-6 py-2 text-lg font-semibold transition ${
                isApplied
                  ? "bg-gray-300 text-gray-700 cursor-default"
                  : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          {/* Job Description */}
          <h1 className="border-b-2 border-b-gray-300 font-semibold text-lg py-4 text-gray-800">
            Job Description
          </h1>

          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {renderField("Project", singleJob?.title)}
            {renderField("Description", singleJob?.description)}
            {renderField("Project Type", singleJob?.projectType)}
            {renderField("Sub Project Type", singleJob?.subProjectType)}
            {renderArrayField("Genres", singleJob?.subGenres)}
            {renderField("Role Type", singleJob?.roleType)}
            {renderField("Role Name", singleJob?.roleName)}
            {renderField("Gender", singleJob?.gender)}
            {renderRangeField(
              "Age",
              singleJob?.age?.min,
              singleJob?.age?.max,
              " years"
            )}
            {renderRangeField(
              "Height",
              singleJob?.height?.min,
              singleJob?.height?.max
            )}
            {renderRangeField(
              "Weight",
              singleJob?.weight?.min,
              singleJob?.weight?.max,
              " kg"
            )}
            {renderArrayField("Skills Required", singleJob?.skills)}
            {renderField("Role Description", singleJob?.roleDescription)}
            {renderArrayField(
              "Media Requirements",
              singleJob?.mediaRequirement
            )}
            {renderField("Salary Per Day", `₹${singleJob?.salaryPerDay}`)}
            {renderField(
              "Expected Work Hours",
              `${singleJob?.expectedWorkHours} hours`
            )}
            {renderField(
              "Expected Completion Time",
              singleJob?.expectedCompletionTime
            )}
            {renderField(
              "Audition Type",
              singleJob?.specialSubmissionAuditions
            )}
          </div>
          {/* Audition Details
           {singleJob?.auditionDetails && (
            <div className="mt-6 bg-gray-50 p-5 rounded-lg shadow-md">
              <h2 className="font-semibold text-lg mb-3">🎭 Audition Details</h2>
              {singleJob?.specialSubmissionAuditions === "Offline" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {singleJob.auditionDetails.location && (
                    <h1 className="font-bold">
                      Location: <span className="font-normal">{singleJob.auditionDetails.location}</span>
                    </h1>
                  )}
                  {singleJob.auditionDetails.date && (
                    <h1 className="font-bold">
                      Date: <span className="font-normal">{new Date(singleJob.auditionDetails.date).toLocaleDateString()}</span>
                    </h1>
                  )}
                </div>
              ) : (//added 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {singleJob.auditionDetails.script && (
                    <>
                      <h1 className="font-bold">Script:</h1>
                      <a
                        href={singleJob.auditionDetails.script}
                        download
                        className="font-normal text-blue-600 underline"
                      >
                        {singleJob.auditionDetails.script}
                      </a>
                    </>
                  )}
                  <h1 className="font-bold">Upload Audition Video (Max: 15MB)</h1>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={isUploading}
                    className="mt-2 p-2 border rounded-md w-full"
                  />
                </div>
              )}
            </div>
          )} */}
          {/* Audition Details */}
          {singleJob?.auditionDetails && (
            <div className="mt-6 bg-gray-50 p-5 rounded-lg shadow-md">
              <h2 className="font-semibold text-lg mb-3">
                🎭 Audition Details
              </h2>

              {singleJob?.specialSubmissionAuditions &&
              String(singleJob.specialSubmissionAuditions).trim() ===
                "Offline" ? (
                // 📌 Show only Location and Date for Offline Auditions
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {singleJob.auditionDetails.location && (
                    <h1 className="font-bold">
                      Location:{" "}
                      <span className="font-normal">
                        {singleJob.auditionDetails.location}
                      </span>
                    </h1>
                  )}
                  {singleJob.auditionDetails.date && (
                    <h1 className="font-bold">
                      Date:{" "}
                      <span className="font-normal">
                        {new Date(
                          singleJob.auditionDetails.date
                        ).toLocaleDateString()}
                      </span>
                    </h1>
                  )}
                </div>
              ) : (
                // 📌 Show Script Download & Video Upload for Online Auditions
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {singleJob.auditionDetails.script && (
                    <>
                      <h1 className="font-bold">Script:</h1>
                      <a
                        href={singleJob.auditionDetails.script}
                        download
                        className="font-normal text-blue-600 underline"
                      >
                        {singleJob.auditionDetails.script}
                      </a>
                    </>
                  )}
                  <h1 className="font-bold">
                    Upload Audition Video (Max: 15MB)
                  </h1>
                  {/* <Button
                    type="file"
                    accept="video/*"
                    onClick={handleVideoUpload}
                    disabled={isUploading || !videoFile}
                    className="mt-2 p-2 border rounded-md w-full"
                  >
                    Upload Video
                  </Button> */}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    
                    className="mt-2 p-2 border rounded-md w-full"
                  />
                  <Button  onClick={applyJobHandler} >Upload</Button>
                </div>
              )}
            </div>
          )}

          {/* Company Details */}
          <div className="mt-6 bg-gray-100 p-5 shadow-purple-300 shadow-lg rounded-lg">
            <h2 className="font-semibold text-lg mb-3">🏢 Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("Company", singleJob?.company?.name)}
              {renderField(
                "Posted Date",
                singleJob?.createdAt
                  ? new Date(singleJob.createdAt).toLocaleDateString()
                  : null
              )}
              {renderField(
                "Total Applications",
                singleJob?.applications?.length
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
