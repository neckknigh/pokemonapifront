import React, { Component } from 'react';
import "./image-container.component.scss";
import { utilService } from '../../../services/util.service';

export enum ImageContainerPosition {
    CENTER,
    START
}

export interface ImageContainerComponentProps {
    readonly img: string;
    readonly displayText: string | undefined;
    readonly iconCls?: string;
    readonly showIcon?: boolean;
    readonly containerCls?: string;
    readonly layoutPosition?: ImageContainerPosition;
    readonly textContainerCls?: string;
    readonly textCls?: string;
    readonly imageCls?: string;
}

class ImageContainerComponent extends Component<ImageContainerComponentProps, {}> {

    /**
     * Permite obtener las clases css aplicadas
     * al icono del contenedor.
     */
    private getIconCls = (): string => {
        const { iconCls } = this.props;
        const iCls: string[] = ["icon"];
        iconCls && iCls.unshift(iconCls);
        return utilService.getArrayItemsAsString(iCls);
    }

    /**
     * Permite obtener las clases css aplicadas
     * al contenedor principal.
     */
    private getContainerCls = (): string => {
        const { containerCls, layoutPosition } = this.props;
        let layoutCls = "flex-row-center-items-center";

        if (layoutPosition === ImageContainerPosition.START) {
            layoutCls = "flex-row-start-items-center";
        }

        const iContainerCls: string[] = [
            layoutCls,
            "image-container"
        ];
        utilService.isDefined(containerCls) && iContainerCls.push(containerCls!);
        return utilService.getArrayItemsAsString(iContainerCls);
    }

    /**
     * Permite obtener los estilos del contenedor
     * del texto desplegado.
     */
    private getTextContainerCls = (): string => {
        const { textContainerCls } = this.props;
        const iTextContainerCls: string[] = [
            "flex-row-center-items-center",
            "box-container"
        ];

        utilService.isDefined(textContainerCls) && iTextContainerCls.push(textContainerCls!);
        return utilService.getArrayItemsAsString(iTextContainerCls);
    }

    /**
     * Permite obtener los estilos que serán aplicados
     * al texto mostrado en el contenedor.
     */
    private getTextCls = (): string => {
        const { textCls } = this.props;
        const iTextCls: string[] = [
            "container-display"
        ];

        utilService.isDefined(textCls) && iTextCls.push(textCls!);
        return utilService.getArrayItemsAsString(iTextCls);
    }

    /**
     * Permite obtener los estilos que serán aplicados
     * a la imagen mostrada en el contenedor.
     */
    private getImageCls = (): string => {
        const { imageCls } = this.props;
        const iImageCls: string[] = [
            "image"
        ];

        utilService.isDefined(imageCls) && iImageCls.push(imageCls!);
        return utilService.getArrayItemsAsString(iImageCls);
    }

    public render(): JSX.Element {
        return (
            <div className={this.getContainerCls()}>
                <img
                    src={this.props.img}
                    alt="container"
                    className={this.getImageCls()}
                />
                <div className={this.getTextContainerCls()}>
                    <span className={this.getTextCls()}>
                        {this.props.displayText}
                    </span>
                    {
                        this.props.showIcon &&
                        <span className="flex-row-center-items-center icon-container">
                            <i className={this.getIconCls()} />
                        </span>
                    }
                </div>
            </div>
        );
    }
}

export default ImageContainerComponent;
