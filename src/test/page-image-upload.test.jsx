import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AdminCreatePage from '../Components/AdminPanel/AdminCreatePage';

// Mock Redux store
const createMockStore = () => {
    return configureStore({
        reducer: {
            createPage: (state = { loading: false, error: null, success: false }, action) => {
                switch (action.type) {
                    case 'CREATE_PAGE_REQUEST':
                        return { ...state, loading: true };
                    case 'CREATE_PAGE_SUCCESS':
                        return { ...state, loading: false, success: true };
                    case 'CREATE_PAGE_FAILURE':
                        return { ...state, loading: false, error: action.payload };
                    default:
                        return state;
                }
            }
        }
    });
};

// Mock the Redux actions
jest.mock('../redux/actions/master/pages/createPage', () => ({
    createPage: jest.fn(() => ({ type: 'CREATE_PAGE_REQUEST' }))
}));

jest.mock('../redux/actions/master/pages/updatePage', () => ({
    updatePage: jest.fn(() => ({ type: 'UPDATE_PAGE_REQUEST' }))
}));

describe('AdminCreatePage Image Upload', () => {
    let store;

    beforeEach(() => {
        store = createMockStore();
    });

    test('should display current image when editing', () => {
        const pageData = {
            _id: '123',
            title: 'Test Page',
            body: '<p>Test content</p>',
            pageImage: 'https://example.com/test-image.jpg'
        };

        render(
            <Provider store={store}>
                <AdminCreatePage
                    pageData={pageData}
                    isEdit={true}
                    onNavigate={() => { }}
                />
            </Provider>
        );

        // Check if current image is displayed
        const image = screen.getByAltText('Current page image');
        expect(image).toBeInTheDocument();
        expect(image.src).toBe('https://example.com/test-image.jpg');
    });

    test('should handle file selection', async () => {
        const file = new File(['test'], 'test-image.jpg', { type: 'image/jpeg' });

        render(
            <Provider store={store}>
                <AdminCreatePage
                    onNavigate={() => { }}
                />
            </Provider>
        );

        const fileInput = screen.getByLabelText(/Featured Image/i);
        fireEvent.change(fileInput, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByText('Selected: test-image.jpg')).toBeInTheDocument();
        });
    });

    test('should show remove button for existing images', () => {
        const pageData = {
            _id: '123',
            title: 'Test Page',
            body: '<p>Test content</p>',
            pageImage: 'https://example.com/test-image.jpg'
        };

        render(
            <Provider store={store}>
                <AdminCreatePage
                    pageData={pageData}
                    isEdit={true}
                    onNavigate={() => { }}
                />
            </Provider>
        );

        // Check if remove button is present
        const removeButton = screen.getByText('Remove Current Image');
        expect(removeButton).toBeInTheDocument();
    });

    test('should validate file size', async () => {
        // Create a large file (3MB)
        const largeFile = new File(['x'.repeat(3 * 1024 * 1024)], 'large-image.jpg', { type: 'image/jpeg' });

        // Mock window.alert
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(
            <Provider store={store}>
                <AdminCreatePage
                    onNavigate={() => { }}
                />
            </Provider>
        );

        const fileInput = screen.getByLabelText(/Featured Image/i);
        fireEvent.change(fileInput, { target: { files: [largeFile] } });

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('File size must be less than 2MB');
        });

        alertSpy.mockRestore();
    });
}); 