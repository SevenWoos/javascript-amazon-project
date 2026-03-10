// Backend = another computer that manages the data of a website.
// Messages can be sent between computers using HTTP (HyperText Transfer Protocol)

// Use built-in class: XMLHttpRequest
const xhr = new XMLHttpRequest();

// Use this to WAIT for response to come back.
xhr.addEventListener('load', () => {
  // Response is NOT available right away since it takes time to send data. So it will be undefined.
  console.log(xhr.response);
});

// 2 parameters = type of HTTP message(GET, POST, PUT, DELETE), where to send HTTP message(URL address that helps locate another computer on the Internet).
xhr.open('GET', 'https://supersimplebackend.dev');

// Using another URL path.
// xhr.open('GET', 'https://supersimplebackend.dev/hello');
// xhr.open('GET', 'https://supersimplebackend.dev/products/first');

// Sending an unsupported URL path will lead to an error.
// Some backends provide a documentation page on which URL paths are supported(Backend API).
// xhr.open('GET', 'https://supersimplebackend.dev/not-supported');

// xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');

// Send message. View results in Network tab after inspect element.
xhr.send();
