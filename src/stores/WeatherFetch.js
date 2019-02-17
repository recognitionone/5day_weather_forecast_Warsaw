// import { observable, action, decorate, computed } from 'mobx';
import { API_KEY } from '../constants/ApiKEY'; 
import { URL } from '../constants/ApiURL'; 
import { LOC } from '../constants/ApiLOCATION'; 
import { UNIT } from '../constants/ApiUNIT'; 


export const WeatherFetch = fetch (
      `${ URL }?APPID=${ API_KEY }&units=${ UNIT }&q=${ LOC }`
          );	



