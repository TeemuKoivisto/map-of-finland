# [Map of Finland with d3/react-simple-maps](http://teemukoivisto.github.io/map-of-finland)

Just an example using these:  
* https://tuomassalmi.com/guide/data/visualization/d3js/2014/03/14/how-to-get-finland-s-map-to-geo-json-and-display-it-in-d3js.html
* https://github.com/tomimick/mapcolorizer
* https://www.react-simple-maps.io/

## How to install

1) `yarn`
2) `npm start`

## Deploying

1) Checkout to `gh-pages` -branch: `git checkout gh-pages`
2) Pull the master: `git pull origin master`
3) Run: `npm run deploy`
4) Add files: `git add -A`
5) Create commit: `git commit -m "Version 0.1.0"`
6) Tag it?: `git tag v.0.1.0`
7) Push it to Github: `git push origin gh-pages --tags`

Now it should be live at http://teemukoivisto.github.io/map-of-finland

Curious thing it always redirects to the root ((http://teemukoivisto.github.io) however it works as long as you don't refresh the page (then it goes to my github-homepage).

EDIT: It was fixed by adding `basename`-prop to BrowserRouter (https://github.com/facebook/create-react-app/issues/1765).

## Explanation how the map was generated

This map with current municipality borders (as of 2017) was created with a lot of pain with the following resources:

* QGIS 2.18.20
* Kuntajako 1:10 000 map from here https://tiedostopalvelu.maanmittauslaitos.fi/tp/kartta
* Map of Finland without sea areas https://fusiontables.google.com/DataSource?docid=1V5-SxUZ9zMlvG1uRpJ0NUK7j53tubyC7ZMYpbt0
* `./cut-small-polys.py` script in this repo to remove small islands from the map
* GDAL http://www.gdal.org/

### Instructions to create the map

[Maanmittauslaitos offers free resources](https://www.maanmittauslaitos.fi/asioi-verkossa/avoimien-aineistojen-tiedostopalvelu) such as map of finnish municipalities (and also Aluehallintovirastojako, Maakuntajako, Valtakuntajako). To download the map you should go here: https://tiedostopalvelu.maanmittauslaitos.fi/tp/kartta and select the layers you want to download (here Kuntajako 1:10 000) and submit your request. Shortly you should get a download link to your email. NOTE: because life must be hard all the files were in latin-9 encoding.

But this is just the beginning! Oh boy yes well you don't have to go through the path of blood and tears as I did so consider yourself lucky. If you open the file with a map program such QGIS first remember to set the encoding to Latin-9 from properties and then convert the CRS with `Save As` and then selecting WGS84 EPSG:4326 as the projection and format as GeoJSON. Also you'll notice that the municipalities include the sea-areas which doesn't look that good. So in order to get rid of the excess area you need another layer with the desired topology.

Here's an old link explaining how it was done back in year 2013 https://github.com/kansanmuisti/datavaalit/wiki/kuntarajat-leikkatuna-suomen-rantaviivalla

Unfortunately the file containing the shape of finnish coast doesn't exist anymore. But thank God there is already a map of finnish municipalities with coastal borders http://datajournalismi.blogspot.com/2013/02/suomen-kuntarajat-2013-kml-formaatissa.html

It includes the map here in Google Drive as Fusiontable https://fusiontables.google.com/DataSource?docid=1V5-SxUZ9zMlvG1uRpJ0NUK7j53tubyC7ZMYpbt0 . You can download it by selecting the `Map of geometry` and then choosing `File -> Download -> Format: KML` (took me too long to figure it out). Now we have the cut layer, yey! No need to fumble around with QGIS and OpenStreet Maps trying to Clip the municipality polygons with a line. Just... don't try to do it...

Using QGIS (I had version 2.18.20) you can open both layers at the same time and then use `Vector -> Geoprocessing Tools -> Clip` and select `kuntarajat` as the input layer and `Kuntarajat 2013` as the cut layer. Now what you get should be the current municipalities with coastline borders. Again save this layer as a GeoJSON file.

However as things would be too easy otherwise you might see that there's a lot of small islands in the map. Those islands are kinda annoying as they are ugly and make the map slower. So what we want to do is to remove all the smallest polygons from the map, right? Which is impossible in QGIS or well I never figured out how to do it.

But thank you [Tomi](https://github.com/tomimick) for already figuring this out for me in the `mapcolorizer` repo. There's a [nifty script](https://github.com/tomimick/mapcolorizer/blob/master/data-finland/data-raw/conv.py) there that loops through the geometries, computes polygon areas and reduces their count. But since at least my GeoJSON was in different shape than Tomi's I had to recreate the script. Wasn't too bad though so thanks again Tomi.

Running `./cut-small-polys.py` should cut away all the smallest polygons from the clipped municipality GeoJSON and output it to `kuntarajat-cut.json`. Remember to set the file names correctly if you wish to try the script.

BUT as I noticed running this script for regions still generates a massive file of complicated polygons. Municipality-map was in tolerable limits (<1 MB) but region map too big (~12 MB). In order to reduce the size I used command line tool called `ogr2ogr` that comes with GDAL library. After installing that you should run `ogr2ogr kuntarajat-2018-2.json kuntarajat-2018.json -simplify 0.005` to simplify the borders. Region-map's size was reduced to 188 kB so 99% reduction. Nice. From user's perspective the map is almost identical.

And that's it! I hope I saved a couple hours (or days) of your life trying to comprehend all this mess. So what was I even supposed to do with this map? Humm...
