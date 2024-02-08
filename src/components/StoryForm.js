
// import React, { useState } from 'react';
// import supabase from '../config/superbaseClient';
// import './StoryForm.css'; // Import your CSS file
// import StoryImage from './StoryImage';



// const StoryForm = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [plot, setPlot] = useState('');
//     const [message, setMessage] = useState('');
//     const [imgUrl, setImgUrl] = useState('');

//     const generateRandomUuid = () => {
//         const hexDigits = '0123456789abcdef';
//         let uuid = '';

//         for (let i = 0; i < 32; i++) {
//             if (i === 8 || i === 12 || i === 16 || i === 20) {
//                 uuid += '-';
//             }
//             uuid += hexDigits[Math.floor(Math.random() * 16)];
//         }

//         return uuid;
//     };

//     const handleInsert = async () => {
//         try {
//             const { data, error } = await supabase
//                 .from('stories')
//                 .upsert([
//                     {
//                         id: (await supabase.auth.getUser()).data.user.id,
//                         storyid: generateRandomUuid(),
//                         title: title,
//                         description: description,
//                         plot: plot,
//                         message: message,
//                         img_url: imgUrl,
//                     },
//                 ])
//                 .select();

//             if (error) {
//                 console.error(error.message);
//                 return;
//             }

//             console.log('Data inserted:', data);
//             setTitle('');
//             setDescription('');
//             setPlot('');
//             setMessage('');
//             setImgUrl('');
//         } catch (error) {
//             console.error('Unexpected error during insert:', error.message);
//         }
//     };

//     return (
//         <div className="story-form-container">
//             <h2 className="form-title">Story Form</h2>
//             <form className="story-form">
//                 <StoryImage
//                     url={imgUrl}
//                     size={150}
//                     id_story={generateRandomUuid()}
//                     onUpload={(url) => {
//                         setImgUrl(url);
//                     }}
//                 />
//                 <br />
//                 <label className="form-label">
//                     Title:
//                     <input className="form-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//                 </label>
//                 <br />
//                 <label>
//                     Description:
//                     <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//                 </label>
//                 <br />
//                 <label>
//                     Plot:
//                     <textarea className='textarea' type="text" value={plot} onChange={(e) => setPlot(e.target.value)} />
//                 </label>
//                 <br />
//                 <label>
//                     Message:
//                     <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//                 </label>
//                 <br />

//                 <button style={{ fontFamily: "Poppins" }} className="form-button" type="button" onClick={handleInsert}>
//                     Upload Story
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default StoryForm;


// StoryForm.js
import React, { useState } from 'react';
import supabase from '../config/superbaseClient';
import './StoryForm.css'; // Import your CSS file
import StoryImage from './StoryImage';
import StoryAudio from './StoryAudio';

const StoryForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [plot, setPlot] = useState('');
    const [message, setMessage] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const generateRandomUuid = () => {
        const hexDigits = '0123456789abcdef';
        let uuid = '';

        for (let i = 0; i < 32; i++) {
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += hexDigits[Math.floor(Math.random() * 16)];
        }

        return uuid;
    };

    const handleInsert = async () => {
        try {
            const { data, error } = await supabase
                .from('stories')
                .upsert([
                    {
                        id: (await supabase.auth.getUser()).data.user.id,
                        storyid: generateRandomUuid(),
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
                console.error(error.message);
                return;
            }

            console.log('Data inserted:', data);
            setTitle('');
            setDescription('');
            setPlot('');
            setMessage('');
            setImgUrl('');
            setAudioUrl('');
        } catch (error) {
            console.error('Unexpected error during insert:', error.message);
        }
    };

    return (
        <div className="story-form-container">
            <h2 className="form-title">Story Form</h2>
            <form className="story-form">
                <StoryImage
                    url={imgUrl}
                    size={150}
                    id_story={generateRandomUuid()}
                    onUpload={(url) => {
                        setImgUrl(url);
                    }}
                />
                <StoryAudio
                    url={audioUrl}
                    id_story={generateRandomUuid()}
                    onUpload={(url) => {
                        setAudioUrl(url);
                    }}
                />
                <br />
                <label className="form-label">
                    Title:
                    <input className="form-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <label>
                    Plot:
                    <textarea className='textarea' type="text" value={plot} onChange={(e) => setPlot(e.target.value)} />
                </label>
                <br />
                <label>
                    Message:
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>
                <br />
                {/* Rest of your form input fields */}
                <button style={{ fontFamily: "Poppins" }} className="form-button" type="button" onClick={handleInsert}>
                    Upload Story
                </button>
            </form>
        </div>
    );
};

export default StoryForm;

