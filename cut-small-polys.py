#!/usr/bin/python
# -*- coding: utf-8 -*-

import json

# Original code can be found from here
# https://github.com/tomimick/mapcolorizer/blob/master/data-finland/data-raw/conv.py

FILE_PATH = './kuntarajat-2018-raw.json'
OUTPUT_PATH = './kuntarajat-2018.json'

MIN_POLYGON_SIZE = 0.001

# EXAMPLE FEATURE
# {  
#    "type":"Feature",
#    "properties":{  
#       "GML_ID":1601300575,
#       "NATCODE":"403",
#       "NAMEFIN":"Lappajrvi",
#       "NAMESWE":"Lappajrvi"
#    },
#    "geometry":{  
#       "type":"MultiPolygon",
#       "coordinates":[  
#          [  
#             [  
#                [  
#                   23.862021241176016,
#                   63.277584446582317
#                ],
#                [  
#                   23.860307651537191,
#                   63.217727889119921
#                ],
#                [  
#                   23.697946112257949,
#                   63.175325491506889
#                ],
#                [  
#                   23.715638349442262,
#                   63.111901184527184
#                ],
#                [  
#                   23.500768587593697,
#                   62.979037193885759
#                ],
#                [  
#                   23.454826917227543,
#                   63.063307329707449
#                ],
#                [  
#                   23.404237442778445,
#                   63.166027488911425
#                ],
#                [  
#                   23.314613679791805,
#                   63.200814689905997
#                ],
#                [  
#                   23.377543929201515,
#                   63.22810885373751
#                ],
#                [  
#                   23.44346235139686,
#                   63.281774977325419
#                ],
#                [  
#                   23.547153979254514,
#                   63.315541581725583
#                ],
#                [  
#                   23.596681943211031,
#                   63.300555713997085
#                ],
#                [  
#                   23.702697895849404,
#                   63.315884847338204
#                ],
#                [  
#                   23.696988940023672,
#                   63.380320683201738
#                ],
#                [  
#                   23.862021241176016,
#                   63.277584446582317
#                ]
#             ]
#          ]
#       ]
#    }
# }

# Cut polygons smaller than 0.001 (km^2 ??)
def cut_small_polygons(geojsonObj):
  for feature in geojsonObj['features']:
    coordinates = feature['geometry']['coordinates']
    cut_coordinates = []
    # Iterate over each polygon in "coordinates" -list
    for polygon in coordinates:
      area = polygon_area(polygon[0])
      if area > MIN_POLYGON_SIZE:
        cut_coordinates.append(polygon)
    # Replace current coordinates with the cut ones
    feature['geometry']['coordinates'] = cut_coordinates
  return geojsonObj

# http://stackoverflow.com/questions/451426/how-do-i-calculate-the-surface-area-of-a-2d-polygon
def polygon_area(p):
  def segments(p):
    return zip(p, p[1:] + [p[0]])
  return 0.5 * abs(sum(x0*y1 - x1*y0 for ((x0, y0), (x1, y1)) in segments(p)))

def write_file(fname, jsondict, prettify=False):
  if prettify:
    jsondata = json.dumps(jsondict, ensure_ascii=False, sort_keys=True, indent=2)
  else:
    jsondata = json.dumps(jsondict, ensure_ascii=False)

  f = open(fname, "w")
  f.write(jsondata.encode("utf8"))
  f.close()

if __name__ == '__main__':
  cut = cut_small_polygons(json.load(open(FILE_PATH)))
  write_file(OUTPUT_PATH, cut)
