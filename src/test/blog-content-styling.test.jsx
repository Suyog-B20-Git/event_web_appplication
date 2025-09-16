import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostDetail from '../Components/Blog/BlogPostDetail';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
    useParams: () => ({ slug: 'test-blog-post' }),
    Link: ({ children, to }) => <a href={to}>{children}</a>
}));

// Mock axiosInstance
jest.mock('../../utility/utils', () => ({
    axiosInstance: {
        get: jest.fn()
    }
}));

describe('BlogPostDetail Content Styling', () => {
    const mockPost = {
        _id: '123',
        title: 'Test Blog Post',
        content: `
      <h1>Main Heading</h1>
      <p>This is a <strong>bold paragraph</strong> with <em>italic text</em>.</p>
      <h2>Sub Heading</h2>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
      <blockquote>This is a blockquote</blockquote>
      <p>Here is a <a href="https://example.com">link</a>.</p>
    `,
        excerpt: '<p>This is an <strong>excerpt</strong> with formatting.</p>',
        additionalFields: '<h3>Additional Info</h3><p>More content here.</p>',
        category: 'technology',
        isFeatured: true,
        visits: 42,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        author: { name: 'John Doe' }
    };

    beforeEach(() => {
        // Mock the axios response
        const { axiosInstance } = require('../../utility/utils');
        axiosInstance.get.mockResolvedValue({
            data: { data: mockPost }
        });
    });

    test('should render blog content with proper styling', () => {
        render(<BlogPostDetail />);

        // Check if the blog content container has the correct class
        const contentContainer = screen.getByText('Main Heading').closest('.blog-content');
        expect(contentContainer).toBeInTheDocument();
    });

    test('should render excerpt with proper styling', () => {
        render(<BlogPostDetail />);

        // Check if the excerpt has the blog-content class
        const excerptContainer = screen.getByText('This is an excerpt with formatting.').closest('.blog-content');
        expect(excerptContainer).toBeInTheDocument();
    });

    test('should render additional fields with proper styling', () => {
        render(<BlogPostDetail />);

        // Check if the additional fields have the blog-content class
        const additionalFieldsContainer = screen.getByText('Additional Info').closest('.blog-content');
        expect(additionalFieldsContainer).toBeInTheDocument();
    });

    test('should render formatted content correctly', () => {
        render(<BlogPostDetail />);

        // Check if bold text is rendered
        expect(screen.getByText('bold paragraph')).toBeInTheDocument();

        // Check if italic text is rendered
        expect(screen.getByText('italic text')).toBeInTheDocument();

        // Check if links are rendered
        expect(screen.getByText('link')).toBeInTheDocument();
    });
}); 