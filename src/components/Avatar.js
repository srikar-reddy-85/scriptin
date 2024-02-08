import { useEffect, useState } from 'react'
import supabase from '../config/superbaseClient';
import './Avatar.css'
// import { IoPencilOutline } from 'react-icons/io5';


export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [googleavatar, setGoogleavatar] = useState();

    // useEffect(() => {
    //     if (url) downloadImage(url)
    // }, [url])

    useEffect(() => {
        if (url) {
            if (url.startsWith('https')) {
                setGoogleavatar(url);
            } else {
                downloadImage(url);
            }
        }
    }, [url]);

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    const uploadAvatar = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;

            // Get the username from the avatar URL (assuming it's available)
            const username = (await supabase.auth.getUser()).data.user.id;

            // Create the desired file path: avatar/{username}/{filename}
            const filePath = `${username}/${fileName}`;

            let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            onUpload(filePath);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ width: size }} aria-live="polite" >
            <div>
                <div style={{ position: "relative", left: "13px" }}>
                    {/* {avatarUrl ?
                        <img
                            src={avatarUrl}
                            alt={avatarUrl ? 'Avatar' : 'No image'}
                            style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}

                        />
                        :
                        <img style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }} src={googleavatar} alt="" />
                    } */}

                    {avatarUrl && (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
                        />
                    )}

                    {googleavatar && !avatarUrl && (
                        <img
                            src={googleavatar}
                            alt="Avatar"
                            style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
                        />
                    )}

                    {!avatarUrl && !googleavatar && (
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/016/009/835/original/the-human-icon-and-logo-vector.jpg"
                            alt=""
                            style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
                        />
                    )}

                    {uploading ? <>

                        <label className="custom-file-input-label" htmlFor="files">
                            <p style={{ position: "relative", left: "25px", top: "50px" }}>uploading.....</p>
                        </label>

                    </> : (
                        <>
                            {/* <input className='image-input'
                                type="file"
                                id="files"
                                accept="image/*"
                                onChange={uploadAvatar}
                                disabled={uploading} /> */}
                            <label className="custom-file-input-label" htmlFor="files">

                            </label>
                            <input
                                className="image-input"
                                type="file"
                                id="files"
                                accept="image/*"
                                onChange={uploadAvatar}
                                disabled={uploading}
                            />

                        </>
                    )}
                </div>
            </div>
        </div>
    )
}