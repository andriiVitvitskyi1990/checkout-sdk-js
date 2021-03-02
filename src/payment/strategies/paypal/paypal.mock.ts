import { PaypalSDK } from './paypal-sdk';

export function getPaypalMock(): PaypalSDK {
    return {
        FUNDING: {
            CARD: 'card',
            CREDIT: 'credit',
        },
        Button: {
            render: jest.fn(),
        },
        checkout: {
            initXO: jest.fn(),
            startFlow: jest.fn(),
            closeFlow: jest.fn(),
            setup: jest.fn(),
        },
        Buttons: jest.fn(),
    };
}

export function getPaypalButtonsMock() {
    return {
        commit: false,
        env: 'production',
        onAuthorize: jest.fn(),
        payment: jest.fn(),
        style: {
        label: undefined,
            shape: 'rect',
    },
        funding: {
            allowed: [],
            disallowed: [],
        },
    };
}
