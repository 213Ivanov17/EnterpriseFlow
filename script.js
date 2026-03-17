// Глобални променливи
let employees = [];
let departments = [];
let towns = [];
let addresses = [];

// Променливи за сортиране и странициране
let currentPage = 1;
let itemsPerPage = 10;
let totalPages = 1;
let sortColumn = 'name';
let sortDirection = 'asc';
let filteredEmployees = [];

// Инициализация при зареждане
window.onload = function() {
    loadInitialData();
    document.getElementById('content').innerHTML = '<h2>Добре дошли в системата за управление</h2><p>Изберете опция от менюто за да видите данни или натиснете "Задачи" за да видите SQL решенията.</p>';
};

// Зареждане на начални данни от предоставената база
function loadInitialData() {
    // Данни за отдели от company.sql
    departments = [
        { department_id: 1, name: 'Engineering', manager_id: 12 },
        { department_id: 2, name: 'Tool Design', manager_id: 4 },
        { department_id: 3, name: 'Sales', manager_id: 273 },
        { department_id: 4, name: 'Marketing', manager_id: 46 },
        { department_id: 5, name: 'Purchasing', manager_id: 6 },
        { department_id: 6, name: 'Research and Development', manager_id: 42 },
        { department_id: 7, name: 'Production', manager_id: 148 },
        { department_id: 8, name: 'Production Control', manager_id: 21 },
        { department_id: 9, name: 'Human Resources', manager_id: 30 },
        { department_id: 10, name: 'Finance', manager_id: 3 },
        { department_id: 11, name: 'Information Services', manager_id: 42 },
        { department_id: 12, name: 'Document Control', manager_id: 90 },
        { department_id: 13, name: 'Quality Assurance', manager_id: 274 },
        { department_id: 14, name: 'Facilities and Maintenance', manager_id: 218 },
        { department_id: 15, name: 'Shipping and Receiving', manager_id: 85 },
        { department_id: 16, name: 'Executive', manager_id: 109 }
    ];

    // Данни за градове (towns) от company.sql
    towns = [
        { town_id: 1, name: 'Redmond' },
        { town_id: 2, name: 'Calgary' },
        { town_id: 3, name: 'Edmonds' },
        { town_id: 4, name: 'Seattle' },
        { town_id: 5, name: 'Bellevue' },
        { town_id: 6, name: 'Issaquah' },
        { town_id: 7, name: 'Everett' },
        { town_id: 8, name: 'Bothell' },
        { town_id: 9, name: 'San Francisco' },
        { town_id: 10, name: 'Index' },
        { town_id: 11, name: 'Snohomish' },
        { town_id: 12, name: 'Monroe' },
        { town_id: 13, name: 'Renton' },
        { town_id: 14, name: 'Newport Hills' },
        { town_id: 15, name: 'Carnation' },
        { town_id: 16, name: 'Sammamish' },
        { town_id: 17, name: 'Duvall' },
        { town_id: 18, name: 'Gold Bar' },
        { town_id: 19, name: 'Nevada' },
        { town_id: 20, name: 'Kenmore' },
        { town_id: 21, name: 'Melbourne' },
        { town_id: 22, name: 'Kent' },
        { town_id: 23, name: 'Cambridge' },
        { town_id: 24, name: 'Minneapolis' },
        { town_id: 25, name: 'Portland' },
        { town_id: 26, name: 'Duluth' },
        { town_id: 27, name: 'Detroit' },
        { town_id: 28, name: 'Memphis' },
        { town_id: 29, name: 'Ottawa' },
        { town_id: 30, name: 'Bordeaux' },
        { town_id: 31, name: 'Berlin' },
        { town_id: 32, name: 'Sofia' }
    ];

    // ВСИЧКИ АДРЕСИ от company.sql (291 адреса)
    addresses = [
        { address_id: 1, address_text: '108 Lakeside Court', town_id: 5 },
        { address_id: 2, address_text: '1343 Prospect St', town_id: 5 },
        { address_id: 3, address_text: '1648 Eastgate Lane', town_id: 5 },
        { address_id: 4, address_text: '2284 Azalea Avenue', town_id: 5 },
        { address_id: 5, address_text: '2947 Vine Lane', town_id: 5 },
        { address_id: 6, address_text: '3067 Maya', town_id: 5 },
        { address_id: 7, address_text: '3197 Thornhill Place', town_id: 5 },
        { address_id: 8, address_text: '3284 S. Blank Avenue', town_id: 5 },
        { address_id: 9, address_text: '332 Laguna Niguel', town_id: 5 },
        { address_id: 10, address_text: '3454 Bel Air Drive', town_id: 5 },
        { address_id: 11, address_text: '3670 All Ways Drive', town_id: 5 },
        { address_id: 12, address_text: '3708 Montana', town_id: 5 },
        { address_id: 13, address_text: '3711 Rollingwood Dr', town_id: 5 },
        { address_id: 14, address_text: '3919 Pinto Road', town_id: 5 },
        { address_id: 15, address_text: '4311 Clay Rd', town_id: 5 },
        { address_id: 16, address_text: '4777 Rockne Drive', town_id: 5 },
        { address_id: 17, address_text: '5678 Clear Court', town_id: 5 },
        { address_id: 18, address_text: '5863 Sierra', town_id: 5 },
        { address_id: 19, address_text: '6058 Hill Street', town_id: 5 },
        { address_id: 20, address_text: '6118 Grasswood Circle', town_id: 5 },
        { address_id: 21, address_text: '620 Woodside Ct.', town_id: 5 },
        { address_id: 22, address_text: '6307 Greenbelt Way', town_id: 5 },
        { address_id: 23, address_text: '6448 Castle Court', town_id: 5 },
        { address_id: 24, address_text: '6774 Bonanza', town_id: 5 },
        { address_id: 25, address_text: '6968 Wren Ave.', town_id: 5 },
        { address_id: 26, address_text: '7221 Peachwillow Street', town_id: 5 },
        { address_id: 27, address_text: '7270 Pepper Way', town_id: 5 },
        { address_id: 28, address_text: '7396 Stratton Circle', town_id: 5 },
        { address_id: 29, address_text: '7808 Brown St.', town_id: 5 },
        { address_id: 30, address_text: '7902 Grammercy Lane', town_id: 5 },
        { address_id: 31, address_text: '8668 Via Neruda', town_id: 5 },
        { address_id: 32, address_text: '8684 Military East', town_id: 5 },
        { address_id: 33, address_text: '8751 Norse Drive', town_id: 5 },
        { address_id: 34, address_text: '9320 Teakwood Dr.', town_id: 5 },
        { address_id: 35, address_text: '9435 Breck Court', town_id: 5 },
        { address_id: 36, address_text: '9745 Bonita Ct.', town_id: 5 },
        { address_id: 37, address_text: 'Pascalstr 951', town_id: 31 },
        { address_id: 38, address_text: '94, rue Descartes', town_id: 30 },
        { address_id: 39, address_text: '1226 Shoe St.', town_id: 8 },
        { address_id: 40, address_text: '1399 Firestone Drive', town_id: 8 },
        { address_id: 41, address_text: '1902 Santa Cruz', town_id: 8 },
        { address_id: 42, address_text: '1970 Napa Ct.', town_id: 8 },
        { address_id: 43, address_text: '250 Race Court', town_id: 8 },
        { address_id: 44, address_text: '5672 Hale Dr.', town_id: 8 },
        { address_id: 45, address_text: '5747 Shirley Drive', town_id: 8 },
        { address_id: 46, address_text: '6387 Scenic Avenue', town_id: 8 },
        { address_id: 47, address_text: '6872 Thornwood Dr.', town_id: 8 },
        { address_id: 48, address_text: '7484 Roundtree Drive', town_id: 8 },
        { address_id: 49, address_text: '8157 W. Book', town_id: 8 },
        { address_id: 50, address_text: '9539 Glenside Dr', town_id: 8 },
        { address_id: 51, address_text: '9833 Mt. Dias Blv.', town_id: 8 },
        { address_id: 52, address_text: '10203 Acorn Avenue', town_id: 2 },
        { address_id: 53, address_text: '3997 Via De Luna', town_id: 23 },
        { address_id: 54, address_text: 'Downshire Way', town_id: 23 },
        { address_id: 55, address_text: '1411 Ranch Drive', town_id: 15 },
        { address_id: 56, address_text: '3074 Arbor Drive', town_id: 15 },
        { address_id: 57, address_text: '390 Ridgewood Ct.', town_id: 15 },
        { address_id: 58, address_text: '9666 Northridge Ct.', town_id: 15 },
        { address_id: 59, address_text: '9752 Jeanne Circle', town_id: 15 },
        { address_id: 60, address_text: '8154 Via Mexico', town_id: 27 },
        { address_id: 61, address_text: '80 Sunview Terrace', town_id: 26 },
        { address_id: 62, address_text: '1825 Corte Del Prado', town_id: 17 },
        { address_id: 63, address_text: '2598 La Vista Circle', town_id: 17 },
        { address_id: 64, address_text: '3421 Bouncing Road', town_id: 17 },
        { address_id: 65, address_text: '3977 Central Avenue', town_id: 17 },
        { address_id: 66, address_text: '5086 Nottingham Place', town_id: 17 },
        { address_id: 67, address_text: '5379 Treasure Island Way', town_id: 17 },
        { address_id: 68, address_text: '8209 Green View Court', town_id: 17 },
        { address_id: 69, address_text: '8463 Vista Avenue', town_id: 17 },
        { address_id: 70, address_text: '9693 Mellowood Street', town_id: 17 },
        { address_id: 71, address_text: '991 Vista Verde', town_id: 17 },
        { address_id: 72, address_text: '1061 Buskrik Avenue', town_id: 3 },
        { address_id: 73, address_text: '172 Turning Dr.', town_id: 3 },
        { address_id: 74, address_text: '2038 Encino Drive', town_id: 3 },
        { address_id: 75, address_text: '2046 Las Palmas', town_id: 3 },
        { address_id: 76, address_text: '2059 Clay Rd', town_id: 3 },
        { address_id: 77, address_text: '207 Berry Court', town_id: 3 },
        { address_id: 78, address_text: '2080 Sycamore Drive', town_id: 3 },
        { address_id: 79, address_text: '2466 Clearland Circle', town_id: 3 },
        { address_id: 80, address_text: '2687 Ridge Road', town_id: 3 },
        { address_id: 81, address_text: '2812 Mazatlan', town_id: 3 },
        { address_id: 82, address_text: '3026 Anchor Drive', town_id: 3 },
        { address_id: 83, address_text: '3281 Hillview Dr.', town_id: 3 },
        { address_id: 84, address_text: '3632 Bank Way', town_id: 3 },
        { address_id: 85, address_text: '371 Apple Dr.', town_id: 3 },
        { address_id: 86, address_text: '504 O St.', town_id: 3 },
        { address_id: 87, address_text: '5423 Champion Rd.', town_id: 3 },
        { address_id: 88, address_text: '6057 Hill Street', town_id: 3 },
        { address_id: 89, address_text: '6870 D Bel Air Drive', town_id: 3 },
        { address_id: 90, address_text: '7338 Green St.', town_id: 3 },
        { address_id: 91, address_text: '7511 Cooper Dr.', town_id: 3 },
        { address_id: 92, address_text: '8152 Claudia Dr.', town_id: 3 },
        { address_id: 93, address_text: '8411 Mt. Orange Place', town_id: 3 },
        { address_id: 94, address_text: '9277 Country View Lane', town_id: 3 },
        { address_id: 95, address_text: '9784 Mt Etna Drive', town_id: 3 },
        { address_id: 96, address_text: '9825 Coralie Drive', town_id: 3 },
        { address_id: 97, address_text: '1185 Dallas Drive', town_id: 7 },
        { address_id: 98, address_text: '1362 Somerset Place', town_id: 7 },
        { address_id: 99, address_text: '181 Gaining Drive', town_id: 7 },
        { address_id: 100, address_text: '1962 Cotton Ct.', town_id: 7 },
        { address_id: 101, address_text: '2176 Apollo Way', town_id: 7 },
        { address_id: 102, address_text: '2294 West 39th St.', town_id: 7 },
        { address_id: 103, address_text: '3238 Laguna Circle', town_id: 7 },
        { address_id: 104, address_text: '3385 Crestview Drive', town_id: 7 },
        { address_id: 105, address_text: '3665 Oak Creek Ct.', town_id: 7 },
        { address_id: 106, address_text: '3928 San Francisco', town_id: 7 },
        { address_id: 107, address_text: '475 Santa Maria', town_id: 7 },
        { address_id: 108, address_text: '5242 Marvelle Ln.', town_id: 7 },
        { address_id: 109, address_text: '5452 Corte Gilberto', town_id: 7 },
        { address_id: 110, address_text: '6629 Polson Circle', town_id: 7 },
        { address_id: 111, address_text: '7640 First Ave.', town_id: 7 },
        { address_id: 112, address_text: '7883 Missing Canyon Court', town_id: 7 },
        { address_id: 113, address_text: '8624 Pepper Way', town_id: 7 },
        { address_id: 114, address_text: '9241 St George Dr.', town_id: 7 },
        { address_id: 115, address_text: '213 Stonewood Drive', town_id: 18 },
        { address_id: 116, address_text: '2425 Notre Dame Ave', town_id: 18 },
        { address_id: 117, address_text: '3884 Beauty Street', town_id: 18 },
        { address_id: 118, address_text: '8036 Summit View Dr.', town_id: 18 },
        { address_id: 119, address_text: '9605 Pheasant Circle', town_id: 18 },
        { address_id: 120, address_text: '1245 Clay Road', town_id: 10 },
        { address_id: 121, address_text: '1748 Bird Drive', town_id: 10 },
        { address_id: 122, address_text: '310 Winter Lane', town_id: 10 },
        { address_id: 123, address_text: '3127 El Camino Drive', town_id: 10 },
        { address_id: 124, address_text: '3514 Sunshine', town_id: 10 },
        { address_id: 125, address_text: '1144 Paradise Ct.', town_id: 6 },
        { address_id: 126, address_text: '1921 Ranch Road', town_id: 6 },
        { address_id: 127, address_text: '3333 Madhatter Circle', town_id: 6 },
        { address_id: 128, address_text: '342 San Simeon', town_id: 6 },
        { address_id: 129, address_text: '3848 East 39th Street', town_id: 6 },
        { address_id: 130, address_text: '5256 Chickpea Ct.', town_id: 6 },
        { address_id: 131, address_text: '5979 El Pueblo', town_id: 6 },
        { address_id: 132, address_text: '6580 Poor Ridge Court', town_id: 6 },
        { address_id: 133, address_text: '7435 Ricardo', town_id: 6 },
        { address_id: 134, address_text: '7691 Benedict Ct.', town_id: 6 },
        { address_id: 135, address_text: '7772 Golden Meadow', town_id: 6 },
        { address_id: 136, address_text: '8585 Los Gatos Ct.', town_id: 6 },
        { address_id: 137, address_text: '9314 Icicle Way', town_id: 6 },
        { address_id: 138, address_text: '9530 Vine Lane', town_id: 6 },
        { address_id: 139, address_text: '989 Crown Ct', town_id: 6 },
        { address_id: 140, address_text: '25 95th Ave NE', town_id: 20 },
        { address_id: 141, address_text: '4095 Cooper Dr.', town_id: 20 },
        { address_id: 142, address_text: '4155 Working Drive', town_id: 20 },
        { address_id: 143, address_text: '463 H Stagecoach Rd.', town_id: 20 },
        { address_id: 144, address_text: '5050 Mt. Wilson Way', town_id: 20 },
        { address_id: 145, address_text: '5203 Virginia Lane', town_id: 20 },
        { address_id: 146, address_text: '5458 Gladstone Drive', town_id: 20 },
        { address_id: 147, address_text: '5553 Cash Avenue', town_id: 20 },
        { address_id: 148, address_text: '5669 Ironwood Way', town_id: 20 },
        { address_id: 149, address_text: '6697 Ridge Park Drive', town_id: 20 },
        { address_id: 150, address_text: '7048 Laurel', town_id: 20 },
        { address_id: 151, address_text: '8192 Seagull Court', town_id: 20 },
        { address_id: 152, address_text: '350 Pastel Drive', town_id: 22 },
        { address_id: 153, address_text: '34 Waterloo Road', town_id: 21 },
        { address_id: 154, address_text: '8291 Crossbow Way', town_id: 28 },
        { address_id: 155, address_text: '5678 Lakeview Blvd.', town_id: 24 },
        { address_id: 156, address_text: '1356 Grove Way', town_id: 12 },
        { address_id: 157, address_text: '158 Walnut Ave', town_id: 12 },
        { address_id: 158, address_text: '1792 Belmont Rd.', town_id: 12 },
        { address_id: 159, address_text: '2275 Valley Blvd.', town_id: 12 },
        { address_id: 160, address_text: '3747 W. Landing Avenue', town_id: 12 },
        { address_id: 161, address_text: '3841 Silver Oaks Place', town_id: 12 },
        { address_id: 162, address_text: '4566 La Jolla', town_id: 12 },
        { address_id: 163, address_text: '4734 Sycamore Court', town_id: 12 },
        { address_id: 164, address_text: '5030 Blue Ridge Dr.', town_id: 12 },
        { address_id: 165, address_text: '5734 Ashford Court', town_id: 12 },
        { address_id: 166, address_text: '7726 Driftwood Drive', town_id: 12 },
        { address_id: 167, address_text: '8310 Ridge Circle', town_id: 12 },
        { address_id: 168, address_text: '896 Southdale', town_id: 12 },
        { address_id: 169, address_text: '9652 Los Angeles', town_id: 12 },
        { address_id: 170, address_text: '2487 Riverside Drive', town_id: 19 },
        { address_id: 171, address_text: '1397 Paradise Ct.', town_id: 14 },
        { address_id: 172, address_text: '1400 Gate Drive', town_id: 14 },
        { address_id: 173, address_text: '3030 Blackburn Ct.', town_id: 14 },
        { address_id: 174, address_text: '4350 Minute Dr.', town_id: 14 },
        { address_id: 175, address_text: '8967 Hamilton Ave.', town_id: 14 },
        { address_id: 176, address_text: '9297 Kenston Dr.', town_id: 14 },
        { address_id: 177, address_text: '9687 Shakespeare Drive', town_id: 14 },
        { address_id: 178, address_text: '9100 Sheppard Avenue North', town_id: 29 },
        { address_id: 179, address_text: '636 Vine Hill Way', town_id: 25 },
        { address_id: 180, address_text: '101 Candy Rd.', town_id: 1 },
        { address_id: 181, address_text: '1275 West Street', town_id: 1 },
        { address_id: 182, address_text: '2137 Birchwood Dr', town_id: 1 },
        { address_id: 183, address_text: '2383 Pepper Drive', town_id: 1 },
        { address_id: 184, address_text: '2427 Notre Dame Ave.', town_id: 1 },
        { address_id: 185, address_text: '2482 Buckingham Dr.', town_id: 1 },
        { address_id: 186, address_text: '3066 Wallace Dr.', town_id: 1 },
        { address_id: 187, address_text: '3397 Rancho View Drive', town_id: 1 },
        { address_id: 188, address_text: '3768 Door Way', town_id: 1 },
        { address_id: 189, address_text: '4909 Poco Lane', town_id: 1 },
        { address_id: 190, address_text: '6369 Ellis Street', town_id: 1 },
        { address_id: 191, address_text: '6891 Ham Drive', town_id: 1 },
        { address_id: 192, address_text: '7297 RisingView', town_id: 1 },
        { address_id: 193, address_text: '8000 Crane Court', town_id: 1 },
        { address_id: 194, address_text: '8040 Hill Ct', town_id: 1 },
        { address_id: 195, address_text: '8467 Clifford Court', town_id: 1 },
        { address_id: 196, address_text: '9006 Woodside Way', town_id: 1 },
        { address_id: 197, address_text: '9322 Driving Drive', town_id: 1 },
        { address_id: 198, address_text: '9863 Ridge Place', town_id: 1 },
        { address_id: 199, address_text: '9882 Clay Rde', town_id: 1 },
        { address_id: 200, address_text: '9906 Oak Grove Road', town_id: 1 },
        { address_id: 201, address_text: '1378 String Dr', town_id: 13 },
        { address_id: 202, address_text: '1803 Olive Hill', town_id: 13 },
        { address_id: 203, address_text: '2176 Brown Street', town_id: 13 },
        { address_id: 204, address_text: '2266 Greenwood Circle', town_id: 13 },
        { address_id: 205, address_text: '2598 Breck Court', town_id: 13 },
        { address_id: 206, address_text: '2736 Scramble Rd', town_id: 13 },
        { address_id: 207, address_text: '4312 Cambridge Drive', town_id: 13 },
        { address_id: 208, address_text: '5009 Orange Street', town_id: 13 },
        { address_id: 209, address_text: '5670 Bel Air Dr.', town_id: 13 },
        { address_id: 210, address_text: '5980 Icicle Circle', town_id: 13 },
        { address_id: 211, address_text: '6510 Hacienda Drive', town_id: 13 },
        { address_id: 212, address_text: '6937 E. 42nd Street', town_id: 13 },
        { address_id: 213, address_text: '7165 Brock Lane', town_id: 13 },
        { address_id: 214, address_text: '7559 Worth Ct.', town_id: 13 },
        { address_id: 215, address_text: '7985 Center Street', town_id: 13 },
        { address_id: 216, address_text: '9495 Limewood Place', town_id: 13 },
        { address_id: 217, address_text: '9533 Working Drive', town_id: 13 },
        { address_id: 218, address_text: '177 11th Ave', town_id: 16 },
        { address_id: 219, address_text: '1962 Ferndale Lane', town_id: 16 },
        { address_id: 220, address_text: '2473 Orchard Way', town_id: 16 },
        { address_id: 221, address_text: '4096 San Remo', town_id: 16 },
        { address_id: 222, address_text: '4310 Kenston Dr.', town_id: 16 },
        { address_id: 223, address_text: '4444 Pepper Way', town_id: 16 },
        { address_id: 224, address_text: '4525 Benedict Ct.', town_id: 16 },
        { address_id: 225, address_text: '5263 Etcheverry Dr', town_id: 16 },
        { address_id: 226, address_text: '535 Greendell Pl', town_id: 16 },
        { address_id: 227, address_text: '6871 Thornwood Dr.', town_id: 16 },
        { address_id: 228, address_text: '6951 Harmony Way', town_id: 16 },
        { address_id: 229, address_text: '7086 O St.', town_id: 16 },
        { address_id: 230, address_text: '7145 Matchstick Drive', town_id: 16 },
        { address_id: 231, address_text: '7820 Bird Drive', town_id: 16 },
        { address_id: 232, address_text: '7939 Bayview Court', town_id: 16 },
        { address_id: 233, address_text: '8316 La Salle St.', town_id: 16 },
        { address_id: 234, address_text: '9104 Mt. Sequoia Ct.', town_id: 16 },
        { address_id: 235, address_text: '1234 Seaside Way', town_id: 9 },
        { address_id: 236, address_text: '5725 Glaze Drive', town_id: 9 },
        { address_id: 237, address_text: '1064 Slow Creek Road', town_id: 4 },
        { address_id: 238, address_text: '1102 Ravenwood', town_id: 4 },
        { address_id: 239, address_text: '1220 Bradford Way', town_id: 4 },
        { address_id: 240, address_text: '1349 Steven Way', town_id: 4 },
        { address_id: 241, address_text: '136 Balboa Court', town_id: 4 },
        { address_id: 242, address_text: '137 Mazatlan', town_id: 4 },
        { address_id: 243, address_text: '1398 Yorba Linda', town_id: 4 },
        { address_id: 244, address_text: '1619 Stillman Court', town_id: 4 },
        { address_id: 245, address_text: '2144 San Rafael', town_id: 4 },
        { address_id: 246, address_text: '2354 Frame Ln.', town_id: 4 },
        { address_id: 247, address_text: '2639 Anchor Court', town_id: 4 },
        { address_id: 248, address_text: '3029 Pastime Dr', town_id: 4 },
        { address_id: 249, address_text: '3243 Buckingham Dr.', town_id: 4 },
        { address_id: 250, address_text: '426 San Rafael', town_id: 4 },
        { address_id: 251, address_text: '4598 Manila Avenue', town_id: 4 },
        { address_id: 252, address_text: '4948 West 4th St', town_id: 4 },
        { address_id: 253, address_text: '502 Alexander Pl.', town_id: 4 },
        { address_id: 254, address_text: '5025 Holiday Hills', town_id: 4 },
        { address_id: 255, address_text: '5125 Cotton Ct.', town_id: 4 },
        { address_id: 256, address_text: '5375 Clearland Circle', town_id: 4 },
        { address_id: 257, address_text: '5376 Catanzaro Way', town_id: 4 },
        { address_id: 258, address_text: '5407 Cougar Way', town_id: 4 },
        { address_id: 259, address_text: '5666 Hazelnut Lane', town_id: 4 },
        { address_id: 260, address_text: '5802 Ampersand Drive', town_id: 4 },
        { address_id: 261, address_text: '6498 Mining Rd.', town_id: 4 },
        { address_id: 262, address_text: '6578 Woodhaven Ln.', town_id: 4 },
        { address_id: 263, address_text: '6657 Sand Pointe Lane', town_id: 4 },
        { address_id: 264, address_text: '6843 San Simeon Dr.', town_id: 4 },
        { address_id: 265, address_text: '7126 Ending Ct.', town_id: 4 },
        { address_id: 266, address_text: '7127 Los Gatos Court', town_id: 4 },
        { address_id: 267, address_text: '7166 Brock Lane', town_id: 4 },
        { address_id: 268, address_text: '7403 N. Broadway', town_id: 4 },
        { address_id: 269, address_text: '7439 Laguna Niguel', town_id: 4 },
        { address_id: 270, address_text: '7594 Alexander Pl.', town_id: 4 },
        { address_id: 271, address_text: '7616 Honey Court', town_id: 4 },
        { address_id: 272, address_text: '77 Birchwood', town_id: 4 },
        { address_id: 273, address_text: '7765 Sunsine Drive', town_id: 4 },
        { address_id: 274, address_text: '7842 Ygnacio Valley Road', town_id: 4 },
        { address_id: 275, address_text: '8290 Margaret Ct.', town_id: 4 },
        { address_id: 276, address_text: '8656 Lakespring Place', town_id: 4 },
        { address_id: 277, address_text: '874 Olivera Road', town_id: 4 },
        { address_id: 278, address_text: '931 Corte De Luna', town_id: 4 },
        { address_id: 279, address_text: '9537 Ridgewood Drive', town_id: 4 },
        { address_id: 280, address_text: '9964 North Ridge Drive', town_id: 4 },
        { address_id: 281, address_text: '1285 Greenbrier Street', town_id: 11 },
        { address_id: 282, address_text: '2115 Passing', town_id: 11 },
        { address_id: 283, address_text: '2601 Cambridge Drive', town_id: 11 },
        { address_id: 284, address_text: '3114 Notre Dame Ave.', town_id: 11 },
        { address_id: 285, address_text: '3280 Pheasant Circle', town_id: 11 },
        { address_id: 286, address_text: '4231 Spar Court', town_id: 11 },
        { address_id: 287, address_text: '4852 Chaparral Court', town_id: 11 },
        { address_id: 288, address_text: '5724 Victory Lane', town_id: 11 },
        { address_id: 289, address_text: '591 Merriewood Drive', town_id: 11 },
        { address_id: 290, address_text: '7230 Vine Maple Street', town_id: 11 },
        { address_id: 291, address_text: '163 Nishava Str, ent A, apt. 1', town_id: 32 }
    ];

    // Данни за служители от company.sql (30 служителя)
    employees = [
        { employee_id: 1, first_name: 'Guy', last_name: 'Gilbert', job_title: 'Production Technician', department_id: 7, manager_id: 16, hire_date: '1998-07-31', salary: 12500.0000, address_id: 166 },
        { employee_id: 2, first_name: 'Kevin', last_name: 'Brown', job_title: 'Marketing Assistant', department_id: 4, manager_id: 6, hire_date: '1999-02-26', salary: 13500.0000, address_id: 102 },
        { employee_id: 3, first_name: 'Roberto', last_name: 'Tamburello', job_title: 'Engineering Manager', department_id: 1, manager_id: 12, hire_date: '1999-12-12', salary: 43300.0000, address_id: 193 },
        { employee_id: 4, first_name: 'Rob', last_name: 'Walters', job_title: 'Senior Tool Designer', department_id: 2, manager_id: 3, hire_date: '2000-01-05', salary: 29800.0000, address_id: 155 },
        { employee_id: 5, first_name: 'Thierry', last_name: 'D\'Hers', job_title: 'Tool Designer', department_id: 2, manager_id: 263, hire_date: '2000-01-11', salary: 25000.0000, address_id: 40 },
        { employee_id: 6, first_name: 'David', last_name: 'Bradley', job_title: 'Marketing Manager', department_id: 5, manager_id: 109, hire_date: '2000-01-20', salary: 37500.0000, address_id: 199 },
        { employee_id: 7, first_name: 'JoLynn', last_name: 'Dobney', job_title: 'Production Supervisor', department_id: 7, manager_id: 21, hire_date: '2000-01-26', salary: 25000.0000, address_id: 275 },
        { employee_id: 8, first_name: 'Ruth', last_name: 'Ellerbrock', job_title: 'Production Technician', department_id: 7, manager_id: 185, hire_date: '2000-02-06', salary: 13500.0000, address_id: 108 },
        { employee_id: 9, first_name: 'Gail', last_name: 'Erickson', job_title: 'Design Engineer', department_id: 1, manager_id: 3, hire_date: '2000-02-06', salary: 32700.0000, address_id: 22 },
        { employee_id: 10, first_name: 'Barry', last_name: 'Johnson', job_title: 'Production Technician', department_id: 7, manager_id: 185, hire_date: '2000-02-07', salary: 13500.0000, address_id: 285 },
        { employee_id: 11, first_name: 'Jossef', last_name: 'Goldberg', job_title: 'Design Engineer', department_id: 1, manager_id: 3, hire_date: '2000-02-24', salary: 32700.0000, address_id: 214 },
        { employee_id: 12, first_name: 'Terri', last_name: 'Duffy', job_title: 'Vice President of Engineering', department_id: 1, manager_id: 109, hire_date: '2000-03-03', salary: 63500.0000, address_id: 209 },
        { employee_id: 13, first_name: 'Sidney', last_name: 'Higa', job_title: 'Production Technician', department_id: 7, manager_id: 185, hire_date: '2000-03-05', salary: 13500.0000, address_id: 73 },
        { employee_id: 14, first_name: 'Taylor', last_name: 'Maxwell', job_title: 'Production Supervisor', department_id: 7, manager_id: 21, hire_date: '2000-03-11', salary: 25000.0000, address_id: 82 },
        { employee_id: 15, first_name: 'Jeffrey', last_name: 'Ford', job_title: 'Production Technician', department_id: 7, manager_id: 185, hire_date: '2000-03-23', salary: 13500.0000, address_id: 156 },
        { employee_id: 16, first_name: 'Jo', last_name: 'Brown', job_title: 'Production Supervisor', department_id: 7, manager_id: 21, hire_date: '2000-03-30', salary: 25000.0000, address_id: 70 },
        { employee_id: 17, first_name: 'Doris', last_name: 'Hartwig', job_title: 'Production Technician', department_id: 7, manager_id: 185, hire_date: '2000-04-11', salary: 13500.0000, address_id: 144 },
        { employee_id: 18, first_name: 'John', last_name: 'Campbell', job_title: 'Production Supervisor', department_id: 7, manager_id: 21, hire_date: '2000-04-18', salary: 25000.0000, address_id: 245 },
        { employee_id: 19, first_name: 'Diane', last_name: 'Glimp', job_title: 'Production Technician', department_id: 7, manager_id: 185, hire_date: '2000-04-29', salary: 13500.0000, address_id: 184 },
        { employee_id: 20, first_name: 'Steven', last_name: 'Selikoff', job_title: 'Production Technician', department_id: 7, manager_id: 173, hire_date: '2001-01-02', salary: 9500.0000, address_id: 104 },
        { employee_id: 21, first_name: 'Peter', last_name: 'Krebs', job_title: 'Production Control Manager', department_id: 8, manager_id: 148, hire_date: '2001-01-02', salary: 24500.0000, address_id: 11 },
        { employee_id: 22, first_name: 'Stuart', last_name: 'Munson', job_title: 'Production Technician', department_id: 7, manager_id: 197, hire_date: '2001-01-03', salary: 10000.0000, address_id: 36 },
        { employee_id: 23, first_name: 'Greg', last_name: 'Alderson', job_title: 'Production Technician', department_id: 7, manager_id: 197, hire_date: '2001-01-03', salary: 10000.0000, address_id: 18 },
        { employee_id: 24, first_name: 'David', last_name: 'Johnson', job_title: 'Production Technician', department_id: 7, manager_id: 184, hire_date: '2001-01-03', salary: 9500.0000, address_id: 142 },
        { employee_id: 25, first_name: 'Zheng', last_name: 'Mu', job_title: 'Production Supervisor', department_id: 7, manager_id: 21, hire_date: '2001-01-04', salary: 25000.0000, address_id: 278 },
        { employee_id: 26, first_name: 'Ivo', last_name: 'Salmre', job_title: 'Production Technician', department_id: 7, manager_id: 108, hire_date: '2001-01-05', salary: 14000.0000, address_id: 165 },
        { employee_id: 27, first_name: 'Paul', last_name: 'Komosinski', job_title: 'Production Technician', department_id: 7, manager_id: 87, hire_date: '2001-01-05', salary: 15000.0000, address_id: 32 },
        { employee_id: 28, first_name: 'Ashvini', last_name: 'Sharma', job_title: 'Network Administrator', department_id: 11, manager_id: 150, hire_date: '2001-01-05', salary: 32500.0000, address_id: 133 },
        { employee_id: 29, first_name: 'Kendall', last_name: 'Keil', job_title: 'Production Technician', department_id: 7, manager_id: 14, hire_date: '2001-01-06', salary: 11000.0000, address_id: 257 },
        { employee_id: 30, first_name: 'Paula', last_name: 'Barreto de Mattos', job_title: 'Human Resources Manager', department_id: 9, manager_id: 140, hire_date: '2001-01-07', salary: 27100.0000, address_id: 2 }
    ];

    // Добавяме имена на отдели и градове към служителите
    employees = employees.map(emp => {
        const dept = departments.find(d => d.department_id === emp.department_id);
        const address = addresses.find(a => a.address_id === emp.address_id);
        const town = address ? towns.find(t => t.town_id === address.town_id) : null;
        
        return {
            ...emp,
            deptName: dept ? dept.name : 'Unknown',
            address_text: address ? address.address_text : 'N/A',
            townName: town ? town.name : 'N/A'
        };
    });
    
    filteredEmployees = [...employees];
}

// Функция за зареждане на служителите
function loadEmployees() {
    document.getElementById('tasks').style.display = 'none';
    document.getElementById('employee-management').style.display = 'block';
    document.getElementById('content').style.display = 'none';
    
    populateDepartmentsAndTowns();
    resetPagination();
    applyFiltersAndSort();
}

// Попълване на select полетата
function populateDepartmentsAndTowns() {
    const deptSelect = document.getElementById('department');
    const townSelect = document.getElementById('city');
    
    deptSelect.innerHTML = '<option value="">Избери отдел</option>';
    townSelect.innerHTML = '<option value="">Избери град</option>';
    
    departments.forEach(dept => {
        deptSelect.innerHTML += `<option value="${dept.department_id}">${dept.name}</option>`;
    });
    
    towns.forEach(town => {
        townSelect.innerHTML += `<option value="${town.town_id}">${town.name}</option>`;
    });
}

// Функции за сортиране
function sortEmployees(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    
    // Актуализиране на иконите
    updateSortIcons();
    
    applyFiltersAndSort();
}

function updateSortIcons() {
    const nameIcon = document.getElementById('sort-name-icon-table');
    const jobIcon = document.getElementById('sort-job-icon-table');
    
    if (nameIcon && jobIcon) {
        nameIcon.className = sortColumn === 'name' 
            ? `fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`
            : 'fas fa-sort';
        
        jobIcon.className = sortColumn === 'job'
            ? `fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`
            : 'fas fa-sort';
    }
}

// Функции за филтриране по заплата
function updateSalaryRange() {
    const minSlider = document.getElementById('salary-min');
    const maxSlider = document.getElementById('salary-max');
    const minInput = document.getElementById('min-salary-input');
    const maxInput = document.getElementById('max-salary-input');
    const salaryValue = document.getElementById('salary-value');
    
    let min = Math.min(parseInt(minSlider.value), parseInt(maxSlider.value));
    let max = Math.max(parseInt(minSlider.value), parseInt(maxSlider.value));
    
    minSlider.value = min;
    maxSlider.value = max;
    minInput.value = min;
    maxInput.value = max;
    
    salaryValue.textContent = `${min} - ${max}`;
}

function updateSalaryFromInput() {
    const minInput = document.getElementById('min-salary-input');
    const maxInput = document.getElementById('max-salary-input');
    const minSlider = document.getElementById('salary-min');
    const maxSlider = document.getElementById('salary-max');
    
    let min = parseInt(minInput.value) || 0;
    let max = parseInt(maxInput.value) || 100000;
    
    min = Math.min(min, max);
    max = Math.max(min, max);
    
    minSlider.value = min;
    maxSlider.value = max;
    minInput.value = min;
    maxInput.value = max;
    
    updateSalaryRange();
}

// Функция за търсене
function searchEmployees() {
    applyFiltersAndSort();
}

function applyFiltersAndSort() {
    const nameFilter = document.getElementById('search-name').value.toLowerCase();
    const positionFilter = document.getElementById('search-position').value.toLowerCase();
    const cityFilter = document.getElementById('search-city').value.toLowerCase();
    const deptFilter = document.getElementById('search-department').value.toLowerCase();
    const minSalary = parseInt(document.getElementById('salary-min').value) || 0;
    const maxSalary = parseInt(document.getElementById('salary-max').value) || 100000;
    
    // Филтриране
    filteredEmployees = employees.filter(emp => {
        const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
        const matchesName = !nameFilter || fullName.includes(nameFilter);
        const matchesPosition = !positionFilter || emp.job_title.toLowerCase().includes(positionFilter);
        const matchesCity = !cityFilter || emp.townName.toLowerCase().includes(cityFilter);
        const matchesDept = !deptFilter || emp.deptName.toLowerCase().includes(deptFilter);
        const matchesSalary = emp.salary >= minSalary && emp.salary <= maxSalary;
        
        return matchesName && matchesPosition && matchesCity && matchesDept && matchesSalary;
    });
    
    // Сортиране
    filteredEmployees.sort((a, b) => {
        let valA, valB;
        
        if (sortColumn === 'name') {
            valA = `${a.first_name} ${a.last_name}`.toLowerCase();
            valB = `${b.first_name} ${b.last_name}`.toLowerCase();
        } else if (sortColumn === 'job') {
            valA = a.job_title.toLowerCase();
            valB = b.job_title.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
            return valA.localeCompare(valB);
        } else {
            return valB.localeCompare(valA);
        }
    });
    
    // Актуализиране на страницирането
    updatePagination();
    displayCurrentPage();
}

// Функции за странициране
function updatePagination() {
    totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    currentPage = Math.min(currentPage, totalPages) || 1;
    
    document.getElementById('total-employees').textContent = filteredEmployees.length;
    
    // Генериране на бутоните за странициране
    const pagination = document.getElementById('pagination');
    if (pagination) {
        let html = '';
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        
        for (let i = startPage; i <= endPage; i++) {
            html += `<button class="page-number ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }
        
        pagination.innerHTML = html;
    }
}

function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    displayCurrentPage();
    updatePagination();
}

function displayCurrentPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredEmployees.slice(start, end);
    
    displayEmployees(pageData);
}

function resetPagination() {
    currentPage = 1;
}

// Показване на служителите в таблица
function displayEmployees(empList) {
    const tbody = document.getElementById('employees-tbody');
    tbody.innerHTML = '';
    
    empList.forEach(emp => {
        tbody.innerHTML += `
            <tr>
                <td>${emp.employee_id}</td>
                <td>${emp.first_name}</td>
                <td>${emp.last_name}</td>
                <td>${emp.job_title}</td>
                <td>${emp.deptName}</td>
                <td>${Number(emp.salary).toFixed(2)} лв.</td>
                <td>${emp.address_text || 'N/A'}</td>
                <td>${emp.townName || 'N/A'}</td>
                <td class="action-cell">
                    <button class="btn-edit" onclick="editEmployee(${emp.employee_id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" onclick="deleteEmployee(${emp.employee_id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
    
    document.getElementById('total-employees').textContent = filteredEmployees.length;
}

// Функция за изчистване на всички филтри
function clearAllFilters() {
    document.getElementById('search-name').value = '';
    document.getElementById('search-position').value = '';
    document.getElementById('search-city').value = '';
    document.getElementById('search-department').value = '';
    
    document.getElementById('salary-min').value = 0;
    document.getElementById('salary-max').value = 100000;
    document.getElementById('min-salary-input').value = 0;
    document.getElementById('max-salary-input').value = 100000;
    document.getElementById('salary-value').textContent = '0 - 100000';
    
    sortColumn = 'name';
    sortDirection = 'asc';
    updateSortIcons();
    
    applyFiltersAndSort();
}

function resetSearch() {
    clearAllFilters();
}

function toggleSearchForm() {
    const form = document.getElementById('search-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Показване на формата за добавяне
function showAddEmployeeForm() {
    document.getElementById('form-title').innerHTML = '<i class="fas fa-user-plus"></i> Добави нов служител';
    document.getElementById('employee-form').style.display = 'block';
    document.getElementById('search-form').style.display = 'none';
    clearForm();
}

// Изчистване на формата
function clearForm() {
    document.getElementById('emp-id').value = '';
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('job-title').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('department').value = '';
    document.getElementById('city').value = '';
    document.getElementById('street').value = '';
}

// Отказ от формата
function cancelForm() {
    document.getElementById('employee-form').style.display = 'none';
    clearForm();
}

// Запазване на служител
function saveEmployee() {
    const id = document.getElementById('emp-id').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const jobTitle = document.getElementById('job-title').value;
    const salary = parseFloat(document.getElementById('salary').value);
    const deptId = parseInt(document.getElementById('department').value);
    const townId = parseInt(document.getElementById('city').value);
    const street = document.getElementById('street').value;

    if (!firstName || !lastName || !jobTitle || !salary || !deptId || !townId || !street) {
        alert('Моля, попълнете всички задължителни полета!');
        return;
    }

    const dept = departments.find(d => d.department_id === deptId);
    const town = towns.find(t => t.town_id === townId);

    // Създаваме нов адрес
    const newAddressId = addresses.length + 1;
    addresses.push({
        address_id: newAddressId,
        address_text: street,
        town_id: townId
    });

    if (id) {
        // Редактиране
        const index = employees.findIndex(e => e.employee_id === parseInt(id));
        if (index !== -1) {
            employees[index] = {
                ...employees[index],
                first_name: firstName,
                last_name: lastName,
                job_title: jobTitle,
                salary: salary,
                department_id: deptId,
                deptName: dept.name,
                address_id: newAddressId,
                address_text: street,
                townName: town.name
            };
            alert('Служителят беше редактиран успешно!');
        }
    } else {
        // Добавяне
        const newId = Math.max(...employees.map(e => e.employee_id), 0) + 1;
        employees.push({
            employee_id: newId,
            first_name: firstName,
            last_name: lastName,
            job_title: jobTitle,
            department_id: deptId,
            deptName: dept.name,
            manager_id: null,
            hire_date: new Date().toISOString().split('T')[0],
            salary: salary,
            address_id: newAddressId,
            address_text: street,
            townName: town.name
        });
        alert('Служителят беше добавен успешно!');
    }

    cancelForm();
    filteredEmployees = [...employees];
    applyFiltersAndSort();
}

// Редактиране на служител
function editEmployee(id) {
    const emp = employees.find(e => e.employee_id === id);
    if (emp) {
        document.getElementById('form-title').innerHTML = '<i class="fas fa-user-edit"></i> Редактиране на служител';
        document.getElementById('emp-id').value = emp.employee_id;
        document.getElementById('first-name').value = emp.first_name;
        document.getElementById('last-name').value = emp.last_name;
        document.getElementById('job-title').value = emp.job_title;
        document.getElementById('salary').value = emp.salary;
        document.getElementById('department').value = emp.department_id;
        
        // Намираме града по адреса
        const address = addresses.find(a => a.address_id === emp.address_id);
        if (address) {
            document.getElementById('city').value = address.town_id;
            document.getElementById('street').value = address.address_text;
        }
        
        document.getElementById('employee-form').style.display = 'block';
        document.getElementById('search-form').style.display = 'none';
    }
}

// Изтриване на служител
function deleteEmployee(id) {
    if (confirm('Сигурни ли сте, че искате да изтриете този служител?')) {
        employees = employees.filter(e => e.employee_id !== id);
        filteredEmployees = filteredEmployees.filter(e => e.employee_id !== id);
        applyFiltersAndSort();
        alert('Служителят беше изтрит успешно!');
    }
}

// Функция за зареждане на отдели
function loadDepartments() {
    document.getElementById('tasks').style.display = 'none';
    document.getElementById('employee-management').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    
    let html = '<h2>Отдели в компанията</h2>';
    html += '<table><tr><th>ID</th><th>Име</th><th>Мениджър</th><th>Брой служители</th></tr>';
    
    departments.forEach(dept => {
        const empCount = employees.filter(e => e.department_id === dept.department_id).length;
        const manager = employees.find(e => e.employee_id === dept.manager_id);
        const managerName = manager ? `${manager.first_name} ${manager.last_name}` : 'Няма';
        
        html += `<tr>
            <td>${dept.department_id}</td>
            <td>${dept.name}</td>
            <td>${managerName}</td>
            <td>${empCount}</td>
        </tr>`;
    });
    
    html += '</table>';
    document.getElementById('content').innerHTML = html;
}

// Функция за зареждане на проекти
function loadProjects() {
    document.getElementById('tasks').style.display = 'none';
    document.getElementById('employee-management').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    
    const projects = [
        { project_id: 1, name: 'Classic Vest', start_date: '2003-06-01', end_date: null },
        { project_id: 2, name: 'Cycling Cap', start_date: '2001-06-01', end_date: '2003-06-01' },
        { project_id: 3, name: 'Full-Finger Gloves', start_date: '2002-06-01', end_date: '2003-06-01' },
        { project_id: 4, name: 'Half-Finger Gloves', start_date: '2002-06-01', end_date: '2003-06-01' },
        { project_id: 5, name: 'HL Mountain Frame', start_date: '2001-06-01', end_date: '2003-06-01' },
        { project_id: 6, name: 'HL Road Frame', start_date: '1998-05-02', end_date: '2003-06-01' },
        { project_id: 7, name: 'HL Touring Frame', start_date: '2005-05-16', end_date: null },
        { project_id: 8, name: 'LL Mountain Frame', start_date: '2002-11-20', end_date: '2003-06-01' }
    ];

    let html = '<h2>Проекти</h2>';
    html += '<table><tr><th>ID</th><th>Име</th><th>Начало</th><th>Край</th><th>Статус</th></tr>';
    
    projects.forEach(proj => {
        const status = !proj.end_date ? 'активен' : 'завършен';
        html += `<tr>
            <td>${proj.project_id}</td>
            <td>${proj.name}</td>
            <td>${proj.start_date}</td>
            <td>${proj.end_date || 'текущ'}</td>
            <td>${status}</td>
        </tr>`;
    });
    
    html += '</table>';
    document.getElementById('content').innerHTML = html;
}

// Функция за показване на решенията на задачите
function showTasks() {
    document.getElementById('tasks').style.display = 'block';
    document.getElementById('employee-management').style.display = 'none';
    document.getElementById('content').style.display = 'none';
    
    const tasksContent = document.getElementById('tasks-content');
    
    const tasks = [
        { 
            num: 1, 
            desc: 'Имена и длъжности на всички служители', 
            sql: 'SELECT CONCAT(first_name, " ", last_name) AS "Име", job_title AS "Длъжност" FROM employees;' 
        },
        { 
            num: 3, 
            desc: 'Служители със заплата > 50000', 
            sql: 'SELECT CONCAT(first_name, " ", last_name) AS "Име", salary AS "Заплата" FROM employees WHERE salary > 50000;' 
        },
        { 
            num: 4, 
            desc: 'Списък с всички градове', 
            sql: 'SELECT name AS "Град" FROM towns;' 
        },
        { 
            num: 5, 
            desc: 'Всички адреси в град София (town_id = 32)', 
            sql: 'SELECT a.address_text AS "Адрес", t.name AS "Град" FROM addresses a JOIN towns t ON a.town_id = t.town_id WHERE t.name = "Sofia";' 
        },
        { 
            num: 6, 
            desc: 'Всички служители от отдел "Sales" (department_id = 3)', 
            sql: 'SELECT CONCAT(e.first_name, " ", e.last_name) AS "Име", e.job_title AS "Длъжност" FROM employees e WHERE e.department_id = 3;' 
        },
        { 
            num: 7, 
            desc: 'Имена и начални дати на проекти, започнали след 1 януари 2003', 
            sql: 'SELECT name AS "Проект", start_date AS "Начална дата" FROM projects WHERE start_date > "2003-01-01";' 
        },
        { 
            num: 8, 
            desc: 'Брой на служителите във всеки отдел', 
            sql: 'SELECT d.name AS "Отдел", COUNT(e.employee_id) AS "Брой служители" FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_id, d.name;' 
        },
        { 
            num: 9, 
            desc: 'Служители без ръководител (manager_id IS NULL)', 
            sql: 'SELECT CONCAT(first_name, " ", last_name) AS "Име", job_title AS "Длъжност" FROM employees WHERE manager_id IS NULL;' 
        },
        { 
            num: 10, 
            desc: 'Всички активни проекти без крайна дата', 
            sql: 'SELECT name AS "Проект", start_date AS "Начална дата" FROM projects WHERE end_date IS NULL;' 
        }
    ];

    let html = '';
    tasks.forEach(task => {
        html += `
            <div class="task-item">
                <h4>Задача ${task.num}: ${task.desc}</h4>
                <pre>${task.sql}</pre>
            </div>
        `;
    });
    
    tasksContent.innerHTML = html;
}