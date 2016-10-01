# transit-isochrone-quality

Comparison of isochrone APIs

##
Setup
* Start Bedford Ave Station
* 15 Minutes
* Transit and Walking
* Sep 1, 2016 12:00am

## APIs
### Opentripplanner
curl -X GET "https://otp.reallysimpleopendata.com/otp/routers/default/isochrone?routeId=default&fromPlace=40.7178469,-73.9577239&date=2016/09/01&time=12:00:00&mode=TRANSIT,WALK&cutoffSec=900"


### Valhalla
curl -X GET "http://matrix.mapzen.com/isochrone?json=%7B%22locations%22:%5B%7B%22lat%22:40.7178469,%22lon%22:-73.9577239%7D%5D,%22costing%22:%22multimodal%22,%22contours%22:%5B%7B%22time%22:15%7D%5D,%22date_time%22:%7B%22type%22:1,%22value%22:%222016-09-01T12:00%22%7D%7D&api_key=the_key"


### Navitia
curl -X GET -H "Authorization: the_key" "https://api.navitia.io/v1/coverage/us-ny/isochrones?from=-73.9577239;40.7178469&last_section_mode=walking&first_section_mode=walking&max_duration=900"