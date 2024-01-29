import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config ( {
    cloud_name: 'dmwz0lddj',
    api_key: '651381635775327',
    api_secret: 'qZme_znyv87MwG0-tzEBaRzaWL0',
    secure: true,
});


describe('Pruebas en <fileUpload/>', () => { 
    
    test('should upload file correctly to cloudinary', async () => { 
        
        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBQzunNXCNzFXS6LCM9XLV1X9PRrCBVjnsA&usqp=CAU';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob],'foto.jpg');

        const url = await fileUpload( file );
        // console.log(url);
        expect( typeof url ).toBe('string');

        // console.log(url);

        const segments = url.split('/')
        const imageId = segments [ segments.length - 1 ].replace('.jpg', '')
        const cloudResp = await cloudinary.api.delete_resources( [ 'journal/' + imageId ] , {
            resource_type: 'image'
        });
        // console.log(cloudResp);

    });

    test('should return null', async () => { 
        const file = new File([],'foto.jpg');

        const url = await fileUpload( file );
        // console.log(url);
        expect( url ).toBe(null);

    })



})