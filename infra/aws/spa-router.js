// Viewer-request function: a path without a file extension is an app route
// (/projects, /about, or an unknown one that React turns into its 404 page),
// so it gets index.html. Files (/assets/x.js, /og.png) pass through untouched.
function handler(event) {
  var request = event.request;
  var last = request.uri.split("/").pop();
  if (last.indexOf(".") === -1) {
    request.uri = "/index.html";
  }
  return request;
}
