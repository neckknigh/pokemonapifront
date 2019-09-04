import React, { Component } from 'react';
import "./product-card.component.scss";
import { utilService } from '../../../../services/util.service';

interface IProductCardComponentProps {
    readonly className?: string;
}

class ProductCardComponent extends Component<IProductCardComponentProps> {

    private getContainerCls(): string {
        const mainCls: string = "grid product-container";
        const { className } = this.props;
        let containerCls = mainCls;

        if (utilService.isDefined(className)) {
            containerCls = `${className} ${mainCls}`;
        }

        return containerCls;
    }

    public render(): JSX.Element {
        return (
            <div className={this.getContainerCls()}>
                <section className="test-border column">
                    Des
                </section>
                <section className="test-border column-30">
                    <img src="/img/comunity/products/product-generic.png" alt="" className="product-thumbnail" />
                </section>
            </div>
        );
    }
}

export default ProductCardComponent;
