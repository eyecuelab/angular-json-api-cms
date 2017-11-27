import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'state' })
export class StatePipe implements PipeTransform {
  states = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
    CA: 'California', CO: 'Colorado', CT: 'Connecticut',
    DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
    ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
    KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine',
    MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan',
    MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
    MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
    NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico',
    NY: 'New York', NC: 'North Carolina', ND: 'North Dakota',
    OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
    RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
    TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
    VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
    WI: 'Wisconsin', WY: 'Wyoming', AS: 'American Samoa',
    DC: 'District of Columbia', FM: 'Federated States of Micronesia',
    GU: 'Guam', MH: 'Marshall Islands', MP: 'Northern Mariana Islands',
    PW: 'Palau', PR: 'Puerto Rico', VI: 'Virgin Islands'
  };

  provences = {
    AB:	'Alberta',
    BC:	'British Columbia',
    MB:	'Manitoba',
    NB:	'New Brunswick',
    NL:	'Newfoundland',
    NS:	'Nova Scotia',
    NT:	'Northwest Territories',
    NU:	'Nunavut',
    ON:	'Ontario',
    PE:	'Prince Edward Island',
    QC:	'Quebec',
    SK:	'Saskatchewan',
    YT:	'Yukon'
  };

  transform(abbr) {
    abbr = abbr.toUpperCase();
    return this.states[abbr] || this.provences[abbr] || abbr;
  }
}
