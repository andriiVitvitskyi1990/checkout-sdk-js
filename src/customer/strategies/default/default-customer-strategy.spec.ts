import { createAction } from '@bigcommerce/data-store';
import { createRequestSender } from '@bigcommerce/request-sender';
import { of } from 'rxjs';

import { createCheckoutStore, CheckoutActionCreator, CheckoutRequestSender, CheckoutStore } from '../../../checkout';
import { ConfigActionCreator, ConfigRequestSender } from '../../../config';
import { FormFieldsActionCreator, FormFieldsRequestSender } from '../../../form';
import { getQuote } from '../../../quote/internal-quotes.mock';
import CustomerActionCreator from '../../customer-action-creator';
import { CustomerActionType } from '../../customer-actions';
import CustomerRequestSender from '../../customer-request-sender';

import DefaultCustomerStrategy from './default-customer-strategy';

describe('DefaultCustomerStrategy', () => {
    let customerActionCreator: CustomerActionCreator;
    let store: CheckoutStore;

    beforeEach(() => {
        store = createCheckoutStore();
        const requestSender = createRequestSender();

        customerActionCreator = new CustomerActionCreator(
            new CustomerRequestSender(requestSender),
            new CheckoutActionCreator(
                new CheckoutRequestSender(requestSender),
                new ConfigActionCreator(new ConfigRequestSender(requestSender)),
                new FormFieldsActionCreator(new FormFieldsRequestSender(requestSender))
            )
        );
    });

    it('dispatches action to sign in customer', async () => {
        const strategy = new DefaultCustomerStrategy(store, customerActionCreator);
        const credentials = { email: 'foo@bar.com', password: 'foobar' };
        const options = {};
        const action = of(createAction(CustomerActionType.SignInCustomerRequested, getQuote()));

        jest.spyOn(customerActionCreator, 'signInCustomer')
            .mockReturnValue(action);

        jest.spyOn(store, 'dispatch');

        const output = await strategy.signIn(credentials, options);

        expect(customerActionCreator.signInCustomer).toHaveBeenCalledWith(credentials, options);
        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect(output).toEqual(store.getState());
    });

    it('dispatches action to sign out customer', async () => {
        const strategy = new DefaultCustomerStrategy(store, customerActionCreator);
        const options = {};
        const action = of(createAction(CustomerActionType.SignOutCustomerRequested, getQuote()));

        jest.spyOn(customerActionCreator, 'signOutCustomer')
            .mockReturnValue(action);

        jest.spyOn(store, 'dispatch');

        const output = await strategy.signOut(options);

        expect(customerActionCreator.signOutCustomer).toHaveBeenCalledWith(options);
        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect(output).toEqual(store.getState());
    });
});
