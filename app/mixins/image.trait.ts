import {Image} from '../entity/image';

export class ImageKeeperTrait {

    image: Image;

    imageFileChange(event) {
        if (event.srcElement.files[0] instanceof File) {

            if (!event.srcElement.files[0].type.match('image.*')) {
                this.image = new Image();
                this.image.hasError = true;
                return;
            }

            this.image = new Image();
            this.image.name = event.srcElement.files[0].name;

            let FR = new FileReader();
            FR.onload = (e) => {

                //noinspection TypeScriptUnresolvedVariable
                this.image.source = e.target.result;
            };
            FR.readAsDataURL(event.srcElement.files[0]);
        }
    }

    imageFileClear(event) {
        this.image = new Image();
    }

}