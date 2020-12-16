import { RequestSender } from '@bigcommerce/request-sender';
import { ScriptLoader } from '@bigcommerce/script-loader';

import { PaypalCommercePaymentProcessor, PaypalCommerceRequestSender, PaypalCommerceScriptLoader } from './index';

export default function createPaypalCommercePaymentProcessor(scriptLoader: ScriptLoader, requestSender: RequestSender, isAPM?: boolean) {
    const paypalScriptLoader = new PaypalCommerceScriptLoader(scriptLoader);
    const paypalCommerceRequestSender = new PaypalCommerceRequestSender(requestSender, isAPM);

    return new PaypalCommercePaymentProcessor(paypalScriptLoader, paypalCommerceRequestSender);
}
