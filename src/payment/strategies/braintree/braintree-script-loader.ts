import { ScriptLoader } from '@bigcommerce/script-loader';

import { PaymentMethodClientUnavailableError } from '../../errors';
import { GooglePayCreator } from '../googlepay';

import { BraintreeClientCreator, BraintreeDataCollectorCreator, BraintreeHostedFieldsCreator, BraintreeHostWindow, BraintreePaypalCheckoutCreator, BraintreePaypalCreator, BraintreeThreeDSecureCreator, BraintreeVisaCheckoutCreator } from './braintree';

export default class BraintreeScriptLoader {
    constructor(
        private _scriptLoader: ScriptLoader,
        private _window: BraintreeHostWindow = window
    ) {}

    loadClient(): Promise<BraintreeClientCreator> {
        return this._scriptLoader
            .loadScript('//js.braintreegateway.com/web/3.70.0/js/client.min.js')
            .then(() => {
                if (!this._window.braintree || !this._window.braintree.client) {
                    throw new PaymentMethodClientUnavailableError();
                }

                return this._window.braintree.client;
            });
    }

    load3DS(): Promise<BraintreeThreeDSecureCreator> {
        return this._scriptLoader
            .loadScript('//js.braintreegateway.com/web/3.70.0/js/three-d-secure.min.js')
            .then(() => {
                if (!this._window.braintree || !this._window.braintree.threeDSecure) {
                    throw new PaymentMethodClientUnavailableError();
                }

                return this._window.braintree.threeDSecure;
            });
    }

    loadDataCollector(): Promise<BraintreeDataCollectorCreator> {
        return this._scriptLoader
            .loadScript('//js.braintreegateway.com/web/3.70.0/js/data-collector.min.js')
            .then(() => {
                if (!this._window.braintree || !this._window.braintree.dataCollector) {
                    throw new PaymentMethodClientUnavailableError();
                }

                return this._window.braintree.dataCollector;
            });
    }

    loadPaypal(): Promise<BraintreePaypalCreator> {

        return this._scriptLoader
            .loadScript('//js.braintreegateway.com/web/3.70.0/js/paypal.min.js')
            .then(() => {
                if (!this._window.braintree || !this._window.braintree.paypal) {
                    throw new PaymentMethodClientUnavailableError();
                }
console.log('%c PAYPAL', 'color: blue', this._window.braintree.paypal);
                return this._window.braintree.paypal;
            });
    }

    loadPaypalCheckout(): Promise<BraintreePaypalCheckoutCreator> {

        return this._scriptLoader
            .loadScript('//js.braintreegateway.com/web/3.70.0/js/paypal-checkout.min.js')
            .then(() => {
                if (!this._window.braintree || !this._window.braintree.paypalCheckout) {
                    throw new PaymentMethodClientUnavailableError();
                }
                console.log('%c PAYPAL CHECKOUT', 'color: blue', this._window.braintree.paypalCheckout);
                return this._window.braintree.paypalCheckout;
            });
    }

    loadVisaCheckout(): Promise<BraintreeVisaCheckoutCreator> {
        return this._scriptLoader
            .loadScript('//js.braintreegateway.com/web/3.70.0/js/visa-checkout.min.js')
            .then(() => {
                if (!this._window.braintree || !this._window.braintree.visaCheckout) {
                    throw new PaymentMethodClientUnavailableError();
                }

                return this._window.braintree.visaCheckout;
            });
    }

    loadGooglePayment(): Promise<GooglePayCreator> {
        return this._scriptLoader
            .loadScript('//js.braintreegateway.com/web/3.70.0/js/google-payment.min.js')
            .then(() => {
                if (!this._window.braintree || !this._window.braintree.googlePayment) {
                    throw new PaymentMethodClientUnavailableError();
                }

                return this._window.braintree.googlePayment;
            });
    }

    async loadHostedFields(): Promise<BraintreeHostedFieldsCreator> {
        await this._scriptLoader.loadScript('//js.braintreegateway.com/web/3.70.0/js/hosted-fields.min.js');

        if (!this._window.braintree || !this._window.braintree.hostedFields) {
            throw new PaymentMethodClientUnavailableError();
        }

        return this._window.braintree.hostedFields;
    }
}
