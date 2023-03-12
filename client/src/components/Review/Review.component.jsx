import React from 'react';
import './Review.style.css'

const Review = () => {
    return (
        <div className='review'>
            <div className='review-heading'>
                <div className='review-heading-avatar'>
                    <img alt='' src='data:image/jpeg;base64,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'/>
                </div>
                <div className='review-heading-info'>
                    <div className='review-username'>joesmoe123</div>
                    <text>Wrote a review</text>
                </div>
            </div>
            <div className='review-picture'>
                <img alt='' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QChRXhpZgAASUkqAAgAAAACAA4BAgBmAAAAJgAAAJiCAgANAAAAjAAAAAAAAABDb21tb24gemVicmEgKGFrYSBCdXJjaGVsbD9zIG9yIHBsYWlucyB6ZWJyYSkgaW4gc2F2YW5uYSBncmFzc2xhbmRzLCBTZXJlbmdldGkgTmF0aW9uYWwgUGFyaywgVGFuemFuaWFNb2dlbnMgVHJvbGxl/+0AyFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAACsHAJQAAxNb2dlbnNUcm9sbGUcAngAZ0NvbW1vbiB6ZWJyYSAoYWthIEJ1cmNoZWxsw6JzIG9yIHBsYWlucyB6ZWJyYSkgaW4gc2F2YW5uYSBncmFzc2xhbmRzLCBTZXJlbmdldGkgTmF0aW9uYWwgUGFyaywgVGFuemFuaWEcAnQADU1vZ2VucyBUcm9sbGUcAm4AGEdldHR5IEltYWdlcy9pU3RvY2twaG90b//hBYZodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgZGM6UmlnaHRzPSJNb2dlbnMgVHJvbGxlIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSIxNTM3MTcwMDUiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmdldHR5aW1hZ2VzLmNvbS9ldWxhP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+TW9nZW5zVHJvbGxlPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5Db21tb24gemVicmEgKGFrYSBCdXJjaGVsbMOicyBvciBwbGFpbnMgemVicmEpIGluIHNhdmFubmEgZ3Jhc3NsYW5kcywgU2VyZW5nZXRpIE5hdGlvbmFsIFBhcmssIFRhbnphbmlhPC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6ZGVzY3JpcHRpb24+CjxwbHVzOkxpY2Vuc29yPjxyZGY6U2VxPjxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPjxwbHVzOkxpY2Vuc29yVVJMPmh0dHBzOi8vd3d3LmdldHR5aW1hZ2VzLmNvbS9kZXRhaWwvMTUzNzE3MDA1P3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+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'></img>
            </div>
            <div className='review-info'>
                <div className='review-info-rating'>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <text>The quick brown fox jumped over the lazy dog.</text>
            </div>
        </div>
    );
}

export default Review;