# realtorca       
[![NPM](https://nodei.co/npm/realtorca.png)](https://npmjs.org/package/realtorca)



#### Wrapper for the realtor.ca API

`https://api2.realtor.ca/Listing.svc/PropertySearch_Post`

#### Methods

`realtor.post` - returns a request-promise POST with the given options

`realtor.buildUrl` - returns a URL with the query string constructed from the specified options.

`realtor.optionsFromUrl` - returns options from a URL from realtor.ca (from the map view)

*^ Note: The website link from `buildUrl` only allows specific price quantities. Any inconsistent `PriceMin` and `PriceMax` values will be rounded up to the next price level. Read the source for clarification.*

#### Usage

```
const realtor = require('realtorca');

let opts = {
  LongitudeMin: -79.6758985519409,
  LongitudeMax: -79.6079635620117,
  LatitudeMin: 43.57601549736786,
  LatitudeMax: 43.602250137362276,
  PriceMin: 100000,
  PriceMax: 410000
};

console.log( realtor.buildUrl(opts) );
//https://www.realtor.ca/Residential/Map.aspx#LongitudeMin=-79.6758985519409&LongitudeMax=-79.6079635620117&LatitudeMin=43.57601549736786&LatitudeMax=43.602250137362276&PriceMin=100000&PriceMax=425000

// Parse options from url
console.log(realtor.optionsFromUrl("https://www.realtor.ca/Residential/Map.aspx#LongitudeMin=-79.6758985519409&LongitudeMax=-79.6079635620117&LatitudeMin=43.57601549736786&LatitudeMax=43.602250137362276&PriceMin=100000&PriceMax=425000"));


realtor.post(opts)
  .then(data => {
      //json response
  })
  .catch(err => {

  });
```

-----

### API Reference/Options
*Most of the information was pulled from the DOM nodes on the website*

All of the following options are optional. The first 3 listed are required but the wrapper will provide a default if they aren't specified.

* `CultureId` - `1` for EN, `2` for FR. Defaulted to 1.
* `ApplicationId` - Unused. Defaulted to 1.
* `PropertySearchTypeId`- Defaulted to 1. Determines the type of property, possible values:
    * `0` No Preference
    * `1` Residential
    * `2` Recreational
    * `3` Condo/Strata
    * `4` Agriculture
    * `5` Parking
    * `6` Vacant Land
    * `8` Multi Family

*Most useful options*

* `PriceMin` - Defaults to 0
* `PriceMax`
* `LongitudeMin` - Designates the bounds of the query, easiest to find these values from browser requests.
* `LongitudeMax`
* `LatitudeMin`
* `LatitudeMax`
* `TransactionTypeId`- Defaults to 2?
    * `1` For sale or rent
    * `2` For sale
    * `3` For rent
* `StoreyRange` - ``"min-max"`` i.e. `"2-3"`
* `BedRange` - `"min-max"` *if min = max, it searches for the exact value. If it's `1-0`, it means it's 1+. Maxes at 5*
* `BathRange` - `"min-max"`

*Others*

* Sorting:

Type | `Sort` |
---- | -------- |
Low to High ($) | `1-A` |
High to Low ($) | `1-D` |
Date Posted: New to Old | `6-D` |
Date Posted: Old to New | `6-A` |
Open Houses First | `12-D` |
More Photos First | `13-D` |
Virtual Tour First | `11-D` |

* `organizationID` - sort/search by organizationID of a group of realtors. Value of this field can be found using a URL such as https://www.realtor.ca/Residential/OfficeDetails.aspx?OrganizationId=271479 as pointed out by Froren.
* `individualID` - sort/search by agentID. Can be found using a URL such as https://www.realtor.ca/Agent/1914698/Gaetan-Kill-130---1152-Main... (in this case individualID = 1914698) as indicated by Kris.
* `viewState` - `m`, `g`, or `1`. Seems irrelevant.
* `Longitude` - Longitude to focus on? Unneeded
* `Latitude` - Latitude to focus on? Unneeded
* `ZoomLevel` - not sure what this does
* `CurrentPage` - read somewhere that it maxes at 51
* `RecordsPerPage` - maxes at 200
* `MaximumResults`
* `PropertyTypeGroupID` - ???
* `OwnershipTypeGroupId`
    * `0` Any
    * `1` Freehold
    * `2` Condo/Strata
    * `3` Timeshare/Fractional
    * `4` Leasehold
* `ViewTypeGroupId`
    * `0` Any
    * `1` City
    * `2` Mountain
    * `3` Ocean
    * `4` Lake
    * `5` River
    * `6` Ravine
    * `7` Other
    * `8` All Water Views
* `BuildingTypeId`
    * `0` Any
    * `1` House
    * `2` Duplex
    * `3` Triplex
    * `5` Residential Commercial Mix
    * `6` Mobile Home
    * `12` Special Purpose
    * `14` Other
    * `16` Row/Townhouse
    * `17` Apartment
    * `19` Fourplex
    * `20` Garden Home
    * `27` Manufactured Home/Mobile
    * `28` Commercial Apartment
    * `29` Manufactured Home
* `ConstructionStyleId`
    * `0` Any
    * `1` Attached
    * `3` Detached
    * `5` Semi-detached
    * `7` Stacked
    * `9` Link
* `AirCondition`- `0` or `1`, defaults 0
* `Pool` - `0` or `1`, defaults 0
* `Fireplace` - `0` or `1`, defaults 0
* `Garage` - `0` or `1`, defaults 0
* `Waterfront` - `0` or `1`, defaults 0
* `Acreage` - `0` or `1`, defaults 0
* `Keywords` - search text
* `ListingIds` - Comma Separated listing Ids
* `ReferenceNumber` - Search using MLS#
* `OpenHouse` - `0` or `1`, must include if filtering by open house
    * `OpenHouseStartDate` - MM/DD/YYYY
    * `OpenHouseEndDate` - MM/DD/YYYY

---------------------------------

Feel free to PR and fork.
