import { useEffect, useState } from 'react';
import supabase from '../config/superbaseClient';
import './StoryImage.css'

export default function StoryImage({ url, size, id_story, onUpload }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('storyimg').download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            setImageUrl(url);
        } catch (error) {
            console.log('Error downloading image: ', error.message);
        }
    };

    const uploadImage = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const username = (await supabase.auth.getUser()).data.user.id;
            // Create the desired file path: /userid/storyid/image/{filename}
            // const filePath = `${userId}/${id_story}/image/${fileName}`;
            const filePath = `${username}/${id_story}/${fileName}`

            let { error: uploadError } = await supabase.storage.from('storyimg').upload(filePath, file);

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
        <div style={{ width: size }} aria-live="polite">
            <div>
                <div>
                    <img
                        src={imageUrl}
                        alt={imageUrl ? 'Story Image' : 'No image'}
                        style={{ width: "150px" }}
                    />
                    {uploading ? 'Uploading...' : (
                        <>
                            <input
                                type="file"
                                id={`story-image-${id_story}`}
                                accept="image/*"
                                className="file-input"
                                onChange={uploadImage}
                                disabled={uploading}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
