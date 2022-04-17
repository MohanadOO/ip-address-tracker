const ipAddress = document.querySelector('[data-ip-address]')
const ipLocation = document.querySelector('[data-location]')
const timeZone = document.querySelector('[data-time-zone]')
const ISP = document.querySelector('[data-isp]')
const search = document.querySelector('.search-submit')

//Map function
var map = L.map('map')
function findLocation(lat, lng, region, country) {
  map.setView([lat, lng], 13)
  L.tileLayer(
    'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=LfT6OjlJ3Uxk2X5bgREI',
    {
      attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token',
    }
  ).addTo(map)

  L.marker([lat, lng]).addTo(map).bindPopup(`${region}, ${country}`).openPopup()
}

search.onclick = () => {
  const searchInput = document.querySelector('.search-input')
  const searchValue = searchInput.value
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_7Vp0irmyCeZBsAR7mulecHFQaIf04&ipAddress=${searchValue}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const { ip, location, isp } = data
      ipAddress.innerText = ip
      ipLocation.innerText = `${location.region}, ${location.country}`
      timeZone.innerText = `UTC ${location.timezone}`
      ISP.innerText = isp

      //passing location data to findLocation function
      findLocation(
        location.lat,
        location.lng,
        location.region,
        location.country
      )
    })
}

//Default IP Address On Load
const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_7Vp0irmyCeZBsAR7mulecHFQaIf04`
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const { ip, location, isp } = data
    ipAddress.innerText = ip
    ipLocation.innerText = `${location.region}, ${location.country}`
    timeZone.innerText = `UTC ${location.timezone}`
    ISP.innerText = isp

    //passing location data to findLocation function
    findLocation(location.lat, location.lng, location.region, location.country)
  })
