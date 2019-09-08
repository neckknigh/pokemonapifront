import React, { Component } from 'react';
import "./payment-ways.component.scss";
import ImageContainerComponent, { ImageContainerPosition } from '../image-container/image-container.component';
import { paymentWays } from './payment-ways-data.component';

class PaymentWaysComponent extends Component {
    public render() {
        return (
            <div className="payment-ways-container">
                {
                    paymentWays.map((paymentWay: any, index: number) => {
                        return (
                            <section className="grid payment-section" key={index}>
                                <h3 className="column-full payment-title">{paymentWay.type}</h3>
                                {
                                    paymentWay.options.map((option: any, i: number) => {
                                        return (
                                            <ImageContainerComponent
                                                img={option.icon}
                                                displayText={option.name}
                                                containerCls="column-50 payment-way clickable"
                                                textCls="name"
                                                imageCls="payment-icon"
                                                layoutPosition={ImageContainerPosition.START}
                                                key={i}
                                            />
                                        );
                                    })
                                }
                            </section>
                        );
                    })
                }
            </div>
        );
    }
}

export default PaymentWaysComponent;
