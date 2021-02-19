const wildAnimals = [
  {
    'id': 1,
    'animal_common_name': 'Llama',
    'animal_science_name': 'Lama glama',
    'color': 'Aquamarine',
    'amount': 54,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 2,
    'animal_common_name': 'Fox, cape',
    'animal_science_name': 'Vulpes chama',
    'color': 'Goldenrod',
    'amount': 55,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 3,
    'animal_common_name': 'Kudu, greater',
    'animal_science_name': 'Tragelaphus strepsiceros',
    'color': 'Indigo',
    'amount': 12,
    'is_fun': false,
    'owner_id': 1  
  },
  {
    'id': 4,
    'animal_common_name': 'Racer, american',
    'animal_science_name': 'Coluber constrictor',
    'color': 'Puce',
    'amount': 68,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 5,
    'animal_common_name': 'Common waterbuck',
    'animal_science_name': 'Kobus defassa',
    'color': 'Maroon',
    'amount': 72,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 6,
    'animal_common_name': 'Burrowing owl',
    'animal_science_name': 'Speotyte cuniculata',
    'color': 'Teal',
    'amount': 74,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 7,
    'animal_common_name': 'Nutcracker, clark\'s',
    'animal_science_name': 'Nucifraga columbiana',
    'color': 'Green',
    'amount': 57,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 8,
    'animal_common_name': 'Impala',
    'animal_science_name': 'Aepyceros mylampus',
    'color': 'Mauv',
    'amount': 12,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 9,
    'animal_common_name': 'Shelduck, european',
    'animal_science_name': 'Tadorna tadorna',
    'color': 'Puce',
    'amount': 94,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 10,
    'animal_common_name': 'Verreaux\'s sifaka',
    'animal_science_name': 'Propithecus verreauxi',
    'color': 'Green',
    'amount': 74,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 11,
    'animal_common_name': 'Phalarope, red',
    'animal_science_name': 'Phalaropus fulicarius',
    'color': 'Yellow',
    'amount': 14,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 12,
    'animal_common_name': 'Clark\'s nutcracker',
    'animal_science_name': 'Nucifraga columbiana',
    'color': 'Purple',
    'amount': 98,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 13,
    'animal_common_name': 'Gecko (unidentified)',
    'animal_science_name': 'unavailable',
    'color': 'Pink',
    'amount': 63,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 14,
    'animal_common_name': 'Zebra, common',
    'animal_science_name': 'Equus burchelli',
    'color': 'Mauv',
    'amount': 80,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 15,
    'animal_common_name': 'Galah',
    'animal_science_name': 'Eolophus roseicapillus',
    'color': 'Blue',
    'amount': 53,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 16,
    'animal_common_name': 'Lemur, brown',
    'animal_science_name': 'Lemur fulvus',
    'color': 'Indigo',
    'amount': 43,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 17,
    'animal_common_name': 'Brown pelican',
    'animal_science_name': 'Pelecanus occidentalis',
    'color': 'Yellow',
    'amount': 51,
    'is_fun': true,
    'owner_id': 1
    
  },
  {
    'id': 18,
    'animal_common_name': 'Tsessebe',
    'animal_science_name': 'Damaliscus lunatus',
    'color': 'Yellow',
    'amount': 24,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 19,
    'animal_common_name': 'Gray heron',
    'animal_science_name': 'Ardea cinerea',
    'color': 'Green',
    'amount': 21,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 20,
    'animal_common_name': 'Red howler monkey',
    'animal_science_name': 'Alouatta seniculus',
    'color': 'Turquoise',
    'amount': 54,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 21,
    'animal_common_name': 'Langur, common',
    'animal_science_name': 'Semnopithecus entellus',
    'color': 'Indigo',
    'amount': 41,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 22,
    'animal_common_name': 'Wallaby, euro',
    'animal_science_name': 'Macropus robustus',
    'color': 'Aquamarine',
    'amount': 63,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 23,
    'animal_common_name': 'Python, carpet',
    'animal_science_name': 'Morelia spilotes variegata',
    'color': 'Green',
    'amount': 8,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 24,
    'animal_common_name': 'Arboral spiny rat',
    'animal_science_name': 'Echimys chrysurus',
    'color': 'Teal',
    'amount': 70,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 25,
    'animal_common_name': 'Shark, blue',
    'animal_science_name': 'Prionace glauca',
    'color': 'Teal',
    'amount': 4,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 26,
    'animal_common_name': 'Gecko, barking',
    'animal_science_name': 'Phylurus milli',
    'color': 'Teal',
    'amount': 91,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 27,
    'animal_common_name': 'Vulture, white-rumped',
    'animal_science_name': 'Gyps bengalensis',
    'color': 'Pink',
    'amount': 14,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 28,
    'animal_common_name': 'Heron, goliath',
    'animal_science_name': 'Ardea golieth',
    'color': 'Turquoise',
    'amount': 95,
    'is_fun': false,
    'owner_id': 1
  },
  {
    'id': 29,
    'animal_common_name': 'Egyptian cobra',
    'animal_science_name': 'Naja haje',
    'color': 'Khaki',
    'amount': 54,
    'is_fun': true,
    'owner_id': 1
  },
  {
    'id': 30,
    'animal_common_name': 'Tortoise, asian foreset',
    'animal_science_name': 'Manouria emys',
    'color': 'Teal',
    'amount': 69,
    'is_fun': true,
    'owner_id': 1
  },
];

module.exports = {
  wildAnimals
};
