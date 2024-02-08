// // UpdateForm.js
// import React, { useState, useEffect, useRef } from 'react';
// import supabase from '../config/superbaseClient';
// // import './StoryForm.css'; // Import your CSS file
// import StoryImage from './StoryImage';
// import './UpdateForm.css'

// const useMountEffect = fun => useEffect(fun, [fun]);


// const UpdateForm = ({ onUpdate, onCancel, story }) => {
//     // console.log(story);
//     const [title, setTitle] = useState(story.title);
//     const [description, setDescription] = useState(story.description);
//     const [plot, setPlot] = useState(story.plot);
//     const [message, setMessage] = useState(story.message);
//     const [imgUrl, setImgUrl] = useState(story.img_url);

//     const updateref = useRef(null);

//     const executeScroll = () => updateref.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll

//     useMountEffect(executeScroll);

//     const handleUpdate = async () => {

//         try {

//             const { data, error } = await supabase
//                 .from('stories')
//                 .upsert([
//                     {
//                         storyid: story.storyid, // specify the storyid to identify the record to update
//                         id: (await supabase.auth.getUser()).data.user.id,
//                         title: title,
//                         description: description,
//                         plot: plot,
//                         message: message,
//                         img_url: imgUrl,
//                     },
//                 ])
//                 .select();
//             // console.log(storyId);

//             if (error) {
//                 console.error('Error updating story:', error.message);
//                 return;
//             }

//             // Notify the parent component about the successful update
//             onUpdate(data[0]);
//         } catch (error) {
//             console.error('Unexpected error during update:', error.message);
//         }
//     };

//     return (
//         <div ref={updateref} className="custom-story-form-container">
//             {/* <h2 className="custom-form-title">Update Form</h2> */}
//             <form className="custom-story-form">
//                 <StoryImage
//                     url={imgUrl}
//                     size={150}
//                     id_story={story.storyid}
//                     onUpload={(url) => setImgUrl(url)}
//                 />
//                 <div className="custom-form-group">
//                     <label className="custom-form-label">
//                         Title:
//                         <input
//                             className="custom-form-input"
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                         />
//                     </label>
//                 </div>
//                 <div className="custom-form-group">
//                     <label className="custom-form-label">
//                         Description:
//                         <input
//                             type="text"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                     </label>
//                 </div>
//                 <div className="custom-form-group">
//                     <label className="custom-form-label">
//                         Plot:
//                         <textarea
//                             className='custom-textarea'
//                             type="text"
//                             value={plot}
//                             onChange={(e) => setPlot(e.target.value)}
//                         />
//                     </label>
//                 </div>
//                 <div className="custom-form-group">
//                     <label className="custom-form-label">
//                         Message:
//                         <input
//                             type="text"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                         />
//                     </label>
//                 </div>

//                 <div className="custom-form-buttons">
//                     <button
//                         style={{ fontFamily: "Lato" }}
//                         className="custom-update_button"
//                         type="button"
//                         onClick={handleUpdate}
//                     >
//                         Update Story
//                     </button>
//                     <button
//                         style={{ fontFamily: "Lato" }}
//                         className="custom-delete_button"
//                         type="button"
//                         onClick={onCancel}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>

//     );
// };

// export default UpdateForm;


// UpdateForm.js
import React, { useState, useEffect, useRef } from 'react';
import supabase from '../config/superbaseClient';
import StoryImage from './StoryImage';
import StoryAudio from './StoryAudio';
import './UpdateForm.css';

const useMountEffect = (fun) => useEffect(fun, [fun]);

const UpdateForm = ({ onUpdate, onCancel, story }) => {
    const [title, setTitle] = useState(story.title);
    const [description, setDescription] = useState(story.description);
    const [plot, setPlot] = useState(story.plot);
    const [message, setMessage] = useState(story.message);
    const [imgUrl, setImgUrl] = useState(story.img_url);
    const [audioUrl, setAudioUrl] = useState(story.audio_url);

    const updateref = useRef(null);

    const executeScroll = () => updateref.current.scrollIntoView();

    useMountEffect(executeScroll);

    const handleUpdate = async () => {
        try {
            const { data, error } = await supabase
                .from('stories')
                .upsert([
                    {
                        storyid: story.storyid,
                        id: (await supabase.auth.getUser()).data.user.id,
                        title: title,
                        description: description,
                        plot: plot,
                        message: message,
                        img_url: imgUrl,
                        audio_url: audioUrl,
                    },
                ])
                .select();

            if (error) {
                console.error('Error updating story:', error.message);
                return;
            }

            onUpdate(data[0]);
        } catch (error) {
            console.error('Unexpected error during update:', error.message);
        }
    };

    return (
        <div ref={updateref} className="custom-story-form-container">
            <form className="custom-story-form">
                <StoryImage
                    url={imgUrl}
                    size={150}
                    id_story={story.storyid}
                    onUpload={(url) => setImgUrl(url)}
                />
                <StoryAudio
                    url={audioUrl}
                    id_story={story.storyid}
                    onUpload={(url) => setAudioUrl(url)}
                />
                <div className="custom-form-group">
                    <label className="custom-form-label">
                        Title:
                        <input
                            className="custom-form-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>
                <div className="custom-form-group">
                    <label className="custom-form-label">
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div className="custom-form-group">
                    <label className="custom-form-label">
                        Plot:
                        <textarea
                            className='custom-textarea'
                            type="text"
                            value={plot}
                            onChange={(e) => setPlot(e.target.value)}
                        />
                    </label>
                </div>
                <div className="custom-form-group">
                    <label className="custom-form-label">
                        Message:
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                </div>

                <div className="custom-form-buttons">
                    <button
                        style={{ fontFamily: "Lato" }}
                        className="custom-update_button"
                        type="button"
                        onClick={handleUpdate}
                    >
                        Update Story
                    </button>
                    <button
                        style={{ fontFamily: "Lato" }}
                        className="custom-delete_button"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;

