import Compressor from '@uppy/compressor';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import Webcam from '@uppy/webcam';
import React, { useEffect, useState } from 'react';

// Don't forget the CSS: core and the UI components + plugins you are using.
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import XHR from '@uppy/xhr-upload';

// type UppyComponentProps = {
//     maxNumberOfFiles: number;
//     width?: string;
//     height?: string;
//     setImageURL: (url: string) => void;
//     folderName: string;
// };

function UppyComponent({ maxNumberOfFiles, width, height, setImageURL, folderName, className }) {
    const [uppyInstance, setUppyInstance] = useState(null);
    useEffect(() => {
        const uppy = new Uppy({
            meta: { type: ['image/jpeg', 'image/png', 'image/webp'] },
            restrictions: {
                maxNumberOfFiles,
                maxFileSize: 400000, // 400kb
                allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
            },
            autoProceed: false,
        })
            .use(Webcam)
            .use(Compressor)
            .use(XHR, {
                endpoint: 'https://apirustss02img.officevg.com/upload',
                allowedMetaFields: [],
                fieldName: folderName,
            });

        uppy.on('complete', (result) => {
            console.log(result?.successful[0]?.response);
            const obj = result?.successful[0]?.response?.body;
            console.log(Object?.keys(result?.successful[0]?.response?.body));
            const dynamicKey = Object?.keys(obj)?.[0];

            const imageUrl = result?.successful[0]?.response?.body[dynamicKey];
            setImageURL(imageUrl);
        });
        setUppyInstance(uppy);
        console.log(uppyInstance);
        return () => {
            uppy.close();
        };
    }, [maxNumberOfFiles]);

    return (
        <>
            {uppyInstance && (
                <Dashboard uppy={uppyInstance} plugins={['Webcam']} className={className && className} width={width === undefined ? '1000' : width} height={height === undefined ? '1000' : height} />
            )}
        </>
    );
}

export default UppyComponent;
