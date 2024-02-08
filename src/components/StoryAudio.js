// StoryAudio.js
import { useEffect, useState } from 'react';
import supabase from '../config/superbaseClient';

export default function StoryAudio({ url, id_story, onUpload }) {
    const [audioUrl, setAudioUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) downloadAudio(url);
    }, [url]);

    const downloadAudio = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('storyaudio').download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            setAudioUrl(url);
        } catch (error) {
            console.log('Error downloading audio: ', error.message);
        }
    };

    const uploadAudio = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an audio file to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const username = (await supabase.auth.getUser()).data.user.id;
            const filePath = `${username}/${id_story}/${fileName}`;

            let { error: uploadError } = await supabase.storage.from('storyaudio').upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            onUpload(filePath);
        } catch (error) {
            console.log(error.message)
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div>
                <audio controls src={audioUrl}></audio>
                {uploading ? 'Uploading...' : (
                    <>
                        <input
                            type="file"
                            id={`story-audio-${id_story}`}
                            accept="audio/*"
                            onChange={uploadAudio}
                            disabled={uploading}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
