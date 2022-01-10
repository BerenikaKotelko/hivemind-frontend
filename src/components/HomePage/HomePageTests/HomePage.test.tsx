import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom'
// the component to test
import HomePage from '../HomePage'
import {render, fireEvent, screen} from '@testing-library/react'
import { JsxEmit } from 'typescript'

const props =
{
    currentUser: {
        id: 1,
        name: "Mike",
        is_faculty: false},
    resources: [{
    id: 1,
    author_id: 1,
    title: "Test resource",
    description: "Description",
    recommended: "nope",
    url: "www.google.com",
    date_added: 1000,
    likes: "12"
  }, 
  {
    id: 2,
    author_id: 2,
    title: "Test resource 2",
    description: "Description 2",
    recommended: "yep",
    url: "www.youtube.com",
    date_added: 2000,
    likes: "1"
  }]
}

test('loads items eventually', async () => {
    const div = document.createElement("div");
    //bob?
    ReactDOM.render(<HomePage {...props} />, div)
    // // Click button
    // fireEvent.click(screen.getByText('Load'))
  
    // Wait for page to update with query text
    // const items = await screen.findAllByText(/Item #[0-9]: /)
    // expect(items).toHaveLength(10)
  })

it('renders Test resource as text on page', () => {
  const {getByTestId} = render(<HomePage {...props}/>);
  expect(getByTestId("resource1")).toHaveTextContent("Test resource");
  expect(getByTestId("resource2")).toHaveTextContent("Test resource 2");
})


//   import {render} from '@testing-library/react'
//   // add custom jest matchers from jest-dom
  
//   test('renders Search bar', async () => {
//       // Arrange
//       // Act
//       // Assert
//     })