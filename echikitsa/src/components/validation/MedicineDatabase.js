
const medicineData = [
    { value: 'A Kare Combipack', label: 'A Kare Combipack' },
    { value: 'AB Phylline Capsule', label: 'AB Phylline Capsule' },
    { value: 'AB Phylline SR 200 Tablet', label: 'AB Phylline SR 200 Tablet' },
    { value: 'AB-Flo Capsule', label: 'AB-Flo Capsule' },
    { value: 'AB-Flo-N Tablet', label: 'AB-Flo-N Tablet' },
    { value: 'Ace Proxyvon Tablet', label: 'Ace Proxyvon Tablet' },
    { value: 'Aceclo Plus Tablet', label: 'Aceclo Plus Tablet' },
    { value: 'Aceclo-MR Tablet', label: 'Aceclo-MR Tablet' },
    { value: 'Acemiz -MR Tablet', label: 'Acemiz -MR Tablet' },
    { value: 'Acemiz Plus Tablet', label: 'Acemiz Plus Tablet' },
    { value: 'Acemiz-S Tablet', label: 'Acemiz-S Tablet' },
    { value: 'Acenac-P  Tablet', label: 'Acenac-P  Tablet' },
    { value: 'Aciloc 150 Tablet', label: 'Aciloc 150 Tablet' },
    { value: 'Aciloc 300 Tablet', label: 'Aciloc 300 Tablet' },
    { value: 'Aciloc RD 20 Tablet', label: 'Aciloc RD 20 Tablet' },
    { value: 'Acitrom 1 Tablet', label: 'Acitrom 1 Tablet' },
    { value: 'Acitrom 2 Tablet', label: 'Acitrom 2 Tablet' },
    { value: 'Acivir 400 DT Tablet', label: 'Acivir 400 DT Tablet' },
    { value: 'Acivir Cream', label: 'Acivir Cream' },
    { value: 'Acogut Tablet', label: 'Acogut Tablet' },
    { value: 'Adaferin Gel', label: 'Adaferin Gel' },
    { value: 'Addnok 0.2mg Tablet', label: 'Addnok 0.2mg Tablet' },
    { value: 'Admenta 5 Tablet', label: 'Admenta 5 Tablet' },
    { value: 'Aerocort Inhaler', label: 'Aerocort Inhaler' },
    { value: 'AF Kit Tablet', label: 'AF Kit Tablet' },
    { value: 'Akt 4 Kit', label: 'Akt 4 Kit' },
    { value: 'Akurit 4 Tablet', label: 'Akurit 4 Tablet' },
    { value: 'Albendazole 400mg Tablet', label: 'Albendazole 400mg Tablet' },
    { value: 'Aldactone 50 Tablet', label: 'Aldactone 50 Tablet' },
    { value: 'Aldactone Tablet', label: 'Aldactone Tablet' },
    { value: 'Aldigesic-SP Tablet', label: 'Aldigesic-SP Tablet' },
    { value: 'Aldosmin 500mg Tablet', label: 'Aldosmin 500mg Tablet' },
    { value: 'Alerid Syrup', label: 'Alerid Syrup' },
    { value: 'Alerid Tablet', label: 'Alerid Tablet' },
    { value: 'Alex Cough Lozenges Lemon Ginger', label: 'Alex Cough Lozenges Lemon Ginger' },
    { value: 'Alex Junior Syrup', label: 'Alex Junior Syrup' },
    { value: 'Alex Syrup', label: 'Alex Syrup' },
    { value: 'Alfoo 10mg Tablet PR', label: 'Alfoo 10mg Tablet PR' },
    { value: 'Alkasol Oral Solution', label: 'Alkasol Oral Solution' },
    { value: 'Allegra 120mg Tablet', label: 'Allegra 120mg Tablet' },
    { value: 'Allegra 180mg Tablet', label: 'Allegra 180mg Tablet' },
    { value: 'Allegra Suspension Raspberry & Vanilla', label: 'Allegra Suspension Raspberry & Vanilla' },
    { value: 'Allegra-M Tablet', label: 'Allegra-M Tablet' },
    { value: 'Almox 500 Capsule', label: 'Almox 500 Capsule' },
    { value: 'Alprax 0.25 Tablet', label: 'Alprax 0.25 Tablet' },
    { value: 'Alprax 0.5mg Tablet SR', label: 'Alprax 0.5mg Tablet SR' },
    { value: 'Althrocin 500 Tablet', label: 'Althrocin 500 Tablet' },
    { value: 'Altraday Capsule SR', label: 'Altraday Capsule SR' },
    { value: 'Amaryl 1mg Tablet', label: 'Amaryl 1mg Tablet' },
    { value: 'Amaryl M  2mg Tablet PR', label: 'Amaryl M  2mg Tablet PR' },
    { value: 'Ambrodil-S Syrup', label: 'Ambrodil-S Syrup' },
    { value: 'Amifru 40 Tablet', label: 'Amifru 40 Tablet' },
    { value: 'Amikacin Sulphate 500mg Injection', label: 'Amikacin Sulphate 500mg Injection' },
    { value: 'Amitone 10mg Tablet', label: 'Amitone 10mg Tablet' },
    { value: 'Amixide-H Tablet', label: 'Amixide-H Tablet' },
    { value: 'Amlip 5 Tablet', label: 'Amlip 5 Tablet' },
    { value: 'Amlokind 5 Tablet', label: 'Amlokind 5 Tablet' },
    { value: 'Amlokind-AT Tablet', label: 'Amlokind-AT Tablet' },
    { value: 'Amlokind-AT Tablet', label: 'Amlokind-AT Tablet' },
    { value: 'Amlong Tablet', label: 'Amlong Tablet' },
    { value: 'Amlopres-AT Tablet', label: 'Amlopres-AT Tablet' },
    { value: 'Amlovas 5 Tablet', label: 'Amlovas 5 Tablet' },
    { value: 'Amoxycillin 500mg Capsule', label: 'Amoxycillin 500mg Capsule' },
    { value: 'Amoxyclav 625 Tablet', label: 'Amoxyclav 625 Tablet' },
    { value: 'Amoxyclav 625 Tablet', label: 'Amoxyclav 625 Tablet' },
    { value: 'Ampoxin 500 Capsule', label: 'Ampoxin 500 Capsule' },
    { value: 'Anafortan 25 mg/300 mg Tablet', label: 'Anafortan 25 mg/300 mg Tablet' },
    { value: 'Angispan - TR 2.5mg Capsule', label: 'Angispan - TR 2.5mg Capsule' },
    { value: 'Ano Metrogyl Cream', label: 'Ano Metrogyl Cream' },
    { value: 'Anobliss Cream', label: 'Anobliss Cream' },
    { value: 'Anovate Cream', label: 'Anovate Cream' },
    { value: 'Anxit 0.25mg Tablet', label: 'Anxit 0.25mg Tablet' },
    { value: 'Anxit 0.5 Tablet', label: 'Anxit 0.5 Tablet' },
    { value: 'Aptimust Syrup', label: 'Aptimust Syrup' },
    { value: 'Aquasol A Capsule', label: 'Aquasol A Capsule' },
    { value: 'Aquazide 12.5 Tablet', label: 'Aquazide 12.5 Tablet' },
    { value: 'Arachitol 6L Injection', label: 'Arachitol 6L Injection' },
    { value: 'Arkamin Tablet', label: 'Arkamin Tablet' },
    { value: 'Ascoril D Plus Syrup Sugar Free', label: 'Ascoril D Plus Syrup Sugar Free' },
    { value: 'Ascoril LS Drops', label: 'Ascoril LS Drops' },
    { value: 'Ascoril LS Junior Syrup', label: 'Ascoril LS Junior Syrup' },
    { value: 'Ascoril LS Syrup', label: 'Ascoril LS Syrup' },
    { value: 'Assurans Tablet', label: 'Assurans Tablet' },
    { value: 'Asthakind-DX Syrup Sugar Free', label: 'Asthakind-DX Syrup Sugar Free' },
    { value: 'Asthakind-LS Expectorant Cola Sugar Free', label: 'Asthakind-LS Expectorant Cola Sugar Free' },
    { value: 'Asthalin 100mcg Inhaler', label: 'Asthalin 100mcg Inhaler' },
    { value: 'Asthalin 4 Tablet', label: 'Asthalin 4 Tablet' },
    { value: 'Asthalin Respules', label: 'Asthalin Respules' },
    { value: 'Asthalin Syrup', label: 'Asthalin Syrup' },
    { value: 'Atarax 10mg Tablet', label: 'Atarax 10mg Tablet' },
    { value: 'Atarax 25mg Tablet', label: 'Atarax 25mg Tablet' },
    { value: 'Atarax Syrup', label: 'Atarax Syrup' },
    { value: 'Ativan 1mg Tablet', label: 'Ativan 1mg Tablet' },
    { value: 'Ativan 2mg Tablet', label: 'Ativan 2mg Tablet' },
    { value: 'Atorlip-F Tablet', label: 'Atorlip-F Tablet' },
    { value: 'Atorva 20 Tablet', label: 'Atorva 20 Tablet' },
    { value: 'Atorva 40 Tablet', label: 'Atorva 40 Tablet' },
    { value: 'Atorva Tablet', label: 'Atorva Tablet' },
    { value: 'Augmentin 1000 Duo Tablet', label: 'Augmentin 1000 Duo Tablet' },
    { value: 'Augmentin 625 Duo Tablet', label: 'Augmentin 625 Duo Tablet' },
    { value: 'Augmentin DDS Suspension', label: 'Augmentin DDS Suspension' },
    { value: 'Augmentin Duo Oral Suspension', label: 'Augmentin Duo Oral Suspension' },
    { value: 'Avamys Nasal Spray', label: 'Avamys Nasal Spray' },
    { value: 'Avil 25 Tablet', label: 'Avil 25 Tablet' },
    { value: 'Avil Injection', label: 'Avil Injection' },
    { value: 'Avil Injection', label: 'Avil Injection' },
    { value: 'Avomine Tablet', label: 'Avomine Tablet' },
    { value: 'Axcer  90mg Tablet', label: 'Axcer  90mg Tablet' },
    { value: 'Axcet M Tablet', label: 'Axcet M Tablet' },
    { value: 'Azee 200mg Dry Syrup', label: 'Azee 200mg Dry Syrup' },
    { value: 'Azee 500 Tablet', label: 'Azee 500 Tablet' },
    { value: 'Azeflo Nasal Spray', label: 'Azeflo Nasal Spray' },
    { value: 'Azicip 500 Tablet', label: 'Azicip 500 Tablet' },
    { value: 'Aziderm 20% Cream', label: 'Aziderm 20% Cream' },
    { value: 'Azithral 200 Liquid', label: 'Azithral 200 Liquid' },
    { value: 'Azithral 500 Tablet', label: 'Azithral 500 Tablet' },
    { value: 'Azmarda 50mg Tablet', label: 'Azmarda 50mg Tablet' },
    { value: 'Azoran Tablet', label: 'Azoran Tablet' },
    { value: 'Aztolet  10 Tablet', label: 'Aztolet  10 Tablet' },
    { value: 'Aztor 10 Tablet', label: 'Aztor 10 Tablet' },
    { value: 'B Bact Ointment', label: 'B Bact Ointment' },
    { value: 'Baclof 10 Tablet', label: 'Baclof 10 Tablet' },
    { value: 'Bactoclav 625 Tablet', label: 'Bactoclav 625 Tablet' },
    { value: 'Bactrim DS Tablet', label: 'Bactrim DS Tablet' },
    { value: 'Bandy Chewable Tablet', label: 'Bandy Chewable Tablet' },
    { value: 'Bandy Suspension', label: 'Bandy Suspension' },
    { value: 'Bandy-Plus 12 Tablet', label: 'Bandy-Plus 12 Tablet' },
    { value: 'Bandy-Plus Chewable Tablet', label: 'Bandy-Plus Chewable Tablet' },
    { value: 'Bandy-Plus Suspension', label: 'Bandy-Plus Suspension' },
    { value: 'Banocide Forte Tablet', label: 'Banocide Forte Tablet' },
    { value: 'Baralgan NU Tablet', label: 'Baralgan NU Tablet' },
    { value: 'Basalog 100IU/ml Injection', label: 'Basalog 100IU/ml Injection' },
    { value: 'Beclomin Ointment', label: 'Beclomin Ointment' },
    { value: 'Benadryl DR Syrup', label: 'Benadryl DR Syrup' },
    { value: 'Benadryl Syrup', label: 'Benadryl Syrup' },
    { value: 'Benalgis Tablet', label: 'Benalgis Tablet' },
    { value: 'Bendex 400 Tablet', label: 'Bendex 400 Tablet' },
    { value: 'Benizep Capsule SR', label: 'Benizep Capsule SR' },
    { value: 'Benzac AC 2.5% Gel', label: 'Benzac AC 2.5% Gel' },
    { value: 'Benzac AC 2.5% Gel', label: 'Benzac AC 2.5% Gel' },
    { value: 'Betacap 20 Tablet', label: 'Betacap 20 Tablet' },
    { value: 'Betacap Plus 10 Capsule SR', label: 'Betacap Plus 10 Capsule SR' },
    { value: 'Betacap TR 20 Capsule', label: 'Betacap TR 20 Capsule' },
    { value: 'Betacap TR 40 Capsule', label: 'Betacap TR 40 Capsule' },
    { value: 'Betadine 10% Ointment', label: 'Betadine 10% Ointment' },
    { value: 'Betadine 10% Ointment', label: 'Betadine 10% Ointment' },
    { value: 'Betadine 10% Solution', label: 'Betadine 10% Solution' },
    { value: 'Betadine 2% Gargle Mint', label: 'Betadine 2% Gargle Mint' },
    { value: 'Betadine Powder', label: 'Betadine Powder' },
    { value: 'Betadine Vaginal Pessaries', label: 'Betadine Vaginal Pessaries' },
    { value: 'Betaloc 25mg Tablet', label: 'Betaloc 25mg Tablet' },
    { value: 'Betaloc 50mg Tablet', label: 'Betaloc 50mg Tablet' },
    { value: 'Betamil GM Cream', label: 'Betamil GM Cream' },
    { value: 'Betavert 16 Tablet', label: 'Betavert 16 Tablet' },
    { value: 'Betheran 25mg Tablet', label: 'Betheran 25mg Tablet' },
    { value: 'Betnesol Forte Tablet', label: 'Betnesol Forte Tablet' },
    { value: 'Betnesol Injection 1ml', label: 'Betnesol Injection 1ml' },
    { value: 'Betnesol Oral Drops', label: 'Betnesol Oral Drops' },
    { value: 'Betnesol Tablet', label: 'Betnesol Tablet' },
    { value: 'Betnesol-N Eye/Ear Drops', label: 'Betnesol-N Eye/Ear Drops' },
    { value: 'Betnovate Cream', label: 'Betnovate Cream' },
    { value: 'Betnovate-C Cream', label: 'Betnovate-C Cream' },
    { value: 'Betnovate-GM Cream', label: 'Betnovate-GM Cream' },
    { value: 'Betnovate-N  Cream', label: 'Betnovate-N  Cream' },
    { value: 'Betnovate-N  Cream', label: 'Betnovate-N  Cream' },
    { value: 'Betnovate-S Ointment', label: 'Betnovate-S Ointment' },
    { value: 'Bexol Tablet', label: 'Bexol Tablet' },
    { value: 'Bharglob 16.5% Injection', label: 'Bharglob 16.5% Injection' },
    { value: 'Bilambic M 20mg/10mg Tablet', label: 'Bilambic M 20mg/10mg Tablet' },
    { value: 'Bilanix Tablet', label: 'Bilanix Tablet' },
    { value: 'Bilashine Tablet', label: 'Bilashine Tablet' },
    { value: 'Bilasure 20 Tablet', label: 'Bilasure 20 Tablet' },
    { value: 'Bilasure M 20mg/10mg Tablet', label: 'Bilasure M 20mg/10mg Tablet' },
    { value: 'Bilazest 20mg Tablet', label: 'Bilazest 20mg Tablet' },
    { value: 'Bilazest M Tablet', label: 'Bilazest M Tablet' },
    { value: 'Bilypsa Tablet', label: 'Bilypsa Tablet' },
    { value: 'Bisoheart 2.5 Tablet', label: 'Bisoheart 2.5 Tablet' },
    { value: 'Bisoheart 5mg Tablet', label: 'Bisoheart 5mg Tablet' },
    { value: 'Bonista Cartridge', label: 'Bonista Cartridge' },
    { value: 'Bonmax PTH 750mcg Solution for Injection', label: 'Bonmax PTH 750mcg Solution for Injection' },
    { value: 'Boostrix Vaccine', label: 'Boostrix Vaccine' },
    { value: 'Botroclot Topical Solution', label: 'Botroclot Topical Solution' },
    { value: 'Botropase Injection', label: 'Botropase Injection' },
    { value: 'BP AT 5mg/50mg Tablet', label: 'BP AT 5mg/50mg Tablet' },
    { value: 'Brakke Tablet', label: 'Brakke Tablet' },
    { value: 'Brevipil 50 Tablet', label: 'Brevipil 50 Tablet' },
    { value: 'Brevoxyl Cream', label: 'Brevoxyl Cream' },
    { value: 'Brilinta 90mg Tablet', label: 'Brilinta 90mg Tablet' },
    { value: 'Brinzotim Eye Drop', label: 'Brinzotim Eye Drop' },
    { value: 'Brite Cream', label: 'Brite Cream' },
    { value: 'Broclear Tablet', label: 'Broclear Tablet' },
    { value: 'Bromhexine Hydrochloride 8mg Tablet', label: 'Bromhexine Hydrochloride 8mg Tablet' },
    { value: 'Bro-Zedex SF Syrup', label: 'Bro-Zedex SF Syrup' },
    { value: 'Bro-Zedex Syrup', label: 'Bro-Zedex Syrup' },
    { value: 'Brozeet-LS Syrup', label: 'Brozeet-LS Syrup' },
    { value: 'Brufen 200 Tablet', label: 'Brufen 200 Tablet' },
    { value: 'Brufen 400 Tablet', label: 'Brufen 400 Tablet' },
    { value: 'Brutaflam 90mg Tablet', label: 'Brutaflam 90mg Tablet' },
    { value: 'Brutaflam-MR 4 Tablet', label: 'Brutaflam-MR 4 Tablet' },
    { value: 'Budamate 200 Transhaler', label: 'Budamate 200 Transhaler' },
    { value: 'Budamate 400 Transcaps', label: 'Budamate 400 Transcaps' },
    { value: 'Budecort 0.5mg Respules 2ml', label: 'Budecort 0.5mg Respules 2ml' },
    { value: 'Budecort 200 Inhaler', label: 'Budecort 200 Inhaler' },
    { value: 'Budesal 0.5mg Respules 2ml', label: 'Budesal 0.5mg Respules 2ml' },
    { value: 'Bupron XL 150 Tablet', label: 'Bupron XL 150 Tablet' },
    { value: 'Burnheal Cream', label: 'Burnheal Cream' },
    { value: 'Buscopan 10mg Tablet', label: 'Buscopan 10mg Tablet' },
    { value: 'Buscopan 20mg Injection', label: 'Buscopan 20mg Injection' },
    { value: 'Buta Proxyvon Capsule', label: 'Buta Proxyvon Capsule' },
    { value: 'Buvalor 10mg Transdermal Patch', label: 'Buvalor 10mg Transdermal Patch' },
    { value: 'Cabgolin 0.25 Tablet', label: 'Cabgolin 0.25 Tablet' },
    { value: 'Cabgolin 0.5 Tablet', label: 'Cabgolin 0.5 Tablet' },
    { value: 'Calpol 500mg Tablet', label: 'Calpol 500mg Tablet' },
    { value: 'Calpol 650mg Tablet', label: 'Calpol 650mg Tablet' },
    { value: 'Calpol T  Tablet', label: 'Calpol T  Tablet' },
    { value: 'Candibiotic Plus Ear Drop', label: 'Candibiotic Plus Ear Drop' },
    { value: 'Candid Mouth Paint', label: 'Candid Mouth Paint' },
    { value: 'Candid-B Cream', label: 'Candid-B Cream' },
    { value: 'Candid-CL Vaginal Suppository', label: 'Candid-CL Vaginal Suppository' },
    { value: 'Candid-V Gel', label: 'Candid-V Gel' },
    { value: 'Candiforce 200 Capsule', label: 'Candiforce 200 Capsule' },
    { value: 'Cardace 2.5 Tablet', label: 'Cardace 2.5 Tablet' },
    { value: 'Cardivas 3.125 Tablet', label: 'Cardivas 3.125 Tablet' },
    { value: 'Carnisure 500 Tablet', label: 'Carnisure 500 Tablet' },
    { value: 'Castor NF Cream', label: 'Castor NF Cream' },
    { value: 'Cefakind 500 Tablet', label: 'Cefakind 500 Tablet' },
    { value: 'Cefakind-CV 500 Tablet', label: 'Cefakind-CV 500 Tablet' },
    { value: 'Cefix 200 Tablet', label: 'Cefix 200 Tablet' },
    { value: 'Ceftas 200 Tablet', label: 'Ceftas 200 Tablet' },
    { value: 'Ceftum 500mg Tablet', label: 'Ceftum 500mg Tablet' },
    { value: 'Cepodem 200 Tablet', label: 'Cepodem 200 Tablet' },
    { value: 'Cepodem XP 325 Tablet', label: 'Cepodem XP 325 Tablet' },
    { value: 'Cetil 500 Tablet', label: 'Cetil 500 Tablet' },
    { value: 'Cetrizine Tablet', label: 'Cetrizine Tablet' },
    { value: 'Chericof Syrup', label: 'Chericof Syrup' },
    { value: 'Cheston Cold Tablet', label: 'Cheston Cold Tablet' },
    { value: 'Cheston Cold Total Tablet', label: 'Cheston Cold Total Tablet' },
    { value: 'Chymoral Forte Tablet', label: 'Chymoral Forte Tablet' },
    { value: 'Chymoral Plus Tablet', label: 'Chymoral Plus Tablet' },
    { value: 'Chymoral-AP Tablet', label: 'Chymoral-AP Tablet' },
    { value: 'Cidmus 50mg Tablet', label: 'Cidmus 50mg Tablet' },
    { value: 'Cifran 500 Tablet', label: 'Cifran 500 Tablet' },
    { value: 'Cifran CT Tablet', label: 'Cifran CT Tablet' },
    { value: 'Cilacar  T Tablet', label: 'Cilacar  T Tablet' },
    { value: 'Cilacar 10 Tablet', label: 'Cilacar 10 Tablet' },
    { value: 'Cilacar 10 Tablet', label: 'Cilacar 10 Tablet' },
    { value: 'Ciplar 10 Tablet', label: 'Ciplar 10 Tablet' },
    { value: 'Ciplar-LA 20 Tablet', label: 'Ciplar-LA 20 Tablet' },
    { value: 'Ciplar-LA 40 Tablet', label: 'Ciplar-LA 40 Tablet' },
    { value: 'Ciplox 500 Tablet', label: 'Ciplox 500 Tablet' },
    { value: 'Ciplox D Eye/Ear Drops', label: 'Ciplox D Eye/Ear Drops' },
    { value: 'Ciplox Eye/Ear Drops', label: 'Ciplox Eye/Ear Drops' },
    { value: 'Ciplox TZ  Tablet', label: 'Ciplox TZ  Tablet' },
    { value: 'Cip-Zox Tablet', label: 'Cip-Zox Tablet' },
    { value: 'Cital Oral Liquid Sugar Free Sugar Free', label: 'Cital Oral Liquid Sugar Free Sugar Free' },
    { value: 'Citralka Liquid', label: 'Citralka Liquid' },
    { value: 'Cizaspa-X Tablet', label: 'Cizaspa-X Tablet' },
    { value: 'Claribid 500 Tablet', label: 'Claribid 500 Tablet' },
    { value: 'Clavam 625 Tablet', label: 'Clavam 625 Tablet' },
    { value: 'Clearwax Ear Drop', label: 'Clearwax Ear Drop' },
    { value: 'Clexane 40mg Injection (0.4ml Each)', label: 'Clexane 40mg Injection (0.4ml Each)' },
    { value: 'Clingen Forte  Vaginal Capsule', label: 'Clingen Forte  Vaginal Capsule' },
    { value: 'Clinsol Gel', label: 'Clinsol Gel' },
    { value: 'Clobenate-Gm Cream', label: 'Clobenate-Gm Cream' },
    { value: 'Clobeta GM Cream', label: 'Clobeta GM Cream' },
    { value: 'Clonafit 0.25mg Tablet', label: 'Clonafit 0.25mg Tablet' },
    { value: 'Clonafit 0.5 MD Tablet', label: 'Clonafit 0.5 MD Tablet' },
    { value: 'Clonafit Beta  Tablet', label: 'Clonafit Beta  Tablet' },
    { value: 'Clonafit Plus  Tablet', label: 'Clonafit Plus  Tablet' },
    { value: 'Clonotril 0.25mg Tablet DT', label: 'Clonotril 0.25mg Tablet DT' },
    { value: 'Clonotril 0.5 Tablet', label: 'Clonotril 0.5 Tablet' },
    { value: 'Clop-G Cream', label: 'Clop-G Cream' },
    { value: 'Clop-G Cream', label: 'Clop-G Cream' },
    { value: 'Clopitab Tablet', label: 'Clopitab Tablet' },
    { value: 'Clopitab-A 75 Capsule', label: 'Clopitab-A 75 Capsule' },
    { value: 'Codistar  Syrup', label: 'Codistar  Syrup' },
    { value: 'Codistar-DX Cough Syrup', label: 'Codistar-DX Cough Syrup' },
    { value: 'Colimex  Oral Drops', label: 'Colimex  Oral Drops' },
    { value: 'Colospa Retard Capsule', label: 'Colospa Retard Capsule' },
    { value: 'Colospa Tablet', label: 'Colospa Tablet' },
    { value: 'Colospa X Tablet', label: 'Colospa X Tablet' },
    { value: 'Combiflam Suspension', label: 'Combiflam Suspension' },
    { value: 'Combiflam Tablet', label: 'Combiflam Tablet' },
    { value: 'Concor 5 Tablet', label: 'Concor 5 Tablet' },
    { value: 'Concor COR 2.5 Tablet', label: 'Concor COR 2.5 Tablet' },
    { value: 'Corbis 2.5 Tablet', label: 'Corbis 2.5 Tablet' },
    { value: 'Cosvate-Gm Cream', label: 'Cosvate-Gm Cream' },
    { value: 'Cremaffin Plus  Syrup', label: 'Cremaffin Plus  Syrup' },
    { value: 'Cremaffin Plus  Syrup Refreshing Sugar Free', label: 'Cremaffin Plus  Syrup Refreshing Sugar Free' },
    { value: 'Cremalax Tablet', label: 'Cremalax Tablet' },
    { value: 'Crina-NCR 10mg Tablet', label: 'Crina-NCR 10mg Tablet' },
    { value: 'Crocin Advance Tablet', label: 'Crocin Advance Tablet' },
    { value: 'CTD 12.5 Tablet', label: 'CTD 12.5 Tablet' },
    { value: 'CTD 6.25 Tablet', label: 'CTD 6.25 Tablet' },
    { value: 'Cyclopam Suspension', label: 'Cyclopam Suspension' },
    { value: 'Cyclopam Tablet', label: 'Cyclopam Tablet' },
    { value: 'Cypon Syrup', label: 'Cypon Syrup' },
    { value: 'Cyra Tablet', label: 'Cyra Tablet' },
    { value: 'Cyra-D Capsule', label: 'Cyra-D Capsule' },
    { value: 'DA Zeagra Tablet', label: 'DA Zeagra Tablet' },
    { value: 'Daflon 1000mg Tablet', label: 'Daflon 1000mg Tablet' },
    { value: 'Daflon 500 MG Tablet', label: 'Daflon 500 MG Tablet' },
    { value: 'Dalacin C 300mg Capsule', label: 'Dalacin C 300mg Capsule' },
    { value: 'Darolac Sachet', label: 'Darolac Sachet' },
    { value: 'Dart Tablet', label: 'Dart Tablet' },
    { value: 'Dazit Tablet', label: 'Dazit Tablet' },
    { value: 'Deca-Durabolin 50 Injection', label: 'Deca-Durabolin 50 Injection' },
    { value: 'Defcort 6 Tablet', label: 'Defcort 6 Tablet' },
    { value: 'Deplatt A 75 Tablet', label: 'Deplatt A 75 Tablet' },
    { value: 'Deriphyllin Injection', label: 'Deriphyllin Injection' },
    { value: 'Deriphyllin Retard 150  Tablet PR', label: 'Deriphyllin Retard 150  Tablet PR' },
    { value: 'Deriphyllin Tablet', label: 'Deriphyllin Tablet' },
    { value: 'Deriva-Cms Gel', label: 'Deriva-Cms Gel' },
    { value: 'Dermi 5 Cream', label: 'Dermi 5 Cream' },
    { value: 'Dermiford Cream', label: 'Dermiford Cream' },
    { value: 'Derobin  Ointment', label: 'Derobin  Ointment' },
    { value: 'Deviry 10mg Tablet', label: 'Deviry 10mg Tablet' },
    { value: 'Dexona Injection', label: 'Dexona Injection' },
    { value: 'Dexona Tablet', label: 'Dexona Tablet' },
    { value: 'Dexona Tablet', label: 'Dexona Tablet' },
    { value: 'Diamicron XR 60 Tablet', label: 'Diamicron XR 60 Tablet' },
    { value: 'Diamox Tablet', label: 'Diamox Tablet' },
    { value: 'Diane 35 Tablet', label: 'Diane 35 Tablet' },
    { value: 'Diclofenac Sodium 50mg Tablet', label: 'Diclofenac Sodium 50mg Tablet' },
    { value: 'Diclomol Tablet', label: 'Diclomol Tablet' },
    { value: 'Diclowin Plus Tablet', label: 'Diclowin Plus Tablet' },
    { value: 'Dinogest Tablet', label: 'Dinogest Tablet' },
    { value: 'Disperzyme Tablet', label: 'Disperzyme Tablet' },
    { value: 'Dizone Tablet', label: 'Dizone Tablet' },
    { value: 'Dolo 650 Tablet', label: 'Dolo 650 Tablet' },
    { value: 'Dolonex DT 20mg Tablet', label: 'Dolonex DT 20mg Tablet' },
    { value: 'Domstal 10mg Tablet', label: 'Domstal 10mg Tablet' },
    { value: 'Domstal Baby Oral Drops', label: 'Domstal Baby Oral Drops' },
    { value: 'Domstal Suspension', label: 'Domstal Suspension' },
    { value: 'Doxinate Plus Tablet', label: 'Doxinate Plus Tablet' },
    { value: 'Doxinate Tablet', label: 'Doxinate Tablet' },
    { value: 'Doxolin 400mg Tablet', label: 'Doxolin 400mg Tablet' },
    { value: 'Doxt-SL Capsule', label: 'Doxt-SL Capsule' },
    { value: 'Doxy-1 L-Dr Forte Capsule', label: 'Doxy-1 L-Dr Forte Capsule' },
    { value: 'Dronis 30 Tablet', label: 'Dronis 30 Tablet' },
    { value: 'Drotin DS Tablet', label: 'Drotin DS Tablet' },
    { value: 'Drotin Tablet', label: 'Drotin Tablet' },
    { value: 'Drotin-M Tablet', label: 'Drotin-M Tablet' },
    { value: 'Dubinor Tablet', label: 'Dubinor Tablet' },
    { value: 'Dulcolax Tablet', label: 'Dulcolax Tablet' },
    { value: 'Duolin 3 Respules 3ml', label: 'Duolin 3 Respules 3ml' },
    { value: 'Duonase Nasal Spray', label: 'Duonase Nasal Spray' },
    { value: 'Duphalac Oral Solution Lemon', label: 'Duphalac Oral Solution Lemon' },
    { value: 'Duphaston 10mg Tablet', label: 'Duphaston 10mg Tablet' },
    { value: 'Duralast 30 Tablet', label: 'Duralast 30 Tablet' },
    { value: 'Duvadilan Tablet', label: 'Duvadilan Tablet' },
    { value: 'Duzela 20 Capsule DR', label: 'Duzela 20 Capsule DR' },
    { value: 'Dydroboon Tablet', label: 'Dydroboon Tablet' },
    { value: 'Dynapar AQ Injection 1ml', label: 'Dynapar AQ Injection 1ml' },
    { value: 'Dynapar Tablet', label: 'Dynapar Tablet' },
    { value: 'Dytor 10 Tablet', label: 'Dytor 10 Tablet' },
    { value: 'Dytor 5 Tablet', label: 'Dytor 5 Tablet' },
    { value: 'Dytor Plus 10 Tablet', label: 'Dytor Plus 10 Tablet' },
    { value: 'Dytor Plus 5 Tablet', label: 'Dytor Plus 5 Tablet' },
    { value: 'Ebast 20 Tablet', label: 'Ebast 20 Tablet' },
    { value: 'Ebast-DC Tablet', label: 'Ebast-DC Tablet' },
    { value: 'Ebast-M Tablet', label: 'Ebast-M Tablet' },
    { value: 'Econorm 250mg Capsule', label: 'Econorm 250mg Capsule' },
    { value: 'Econorm Capsule', label: 'Econorm Capsule' },
    { value: 'Ecosprin 150 Tablet', label: 'Ecosprin 150 Tablet' },
    { value: 'Ecosprin 75 Tablet', label: 'Ecosprin 75 Tablet' },
    { value: 'Ecosprin AV 75/20 Capsule', label: 'Ecosprin AV 75/20 Capsule' },
    { value: 'Ecosprin Gold  10 Capsule', label: 'Ecosprin Gold  10 Capsule' },
    { value: 'Ecosprin Gold  20 Capsule', label: 'Ecosprin Gold  20 Capsule' },
    { value: 'Ecosprin-AV 75 Capsule', label: 'Ecosprin-AV 75 Capsule' },
    { value: 'Eflora Cream', label: 'Eflora Cream' },
    { value: 'Eldervit 12 Combipack', label: 'Eldervit 12 Combipack' },
    { value: 'Eldoper 2mg Capsule', label: 'Eldoper 2mg Capsule' },
    { value: 'Eliquis 2.5mg Tablet', label: 'Eliquis 2.5mg Tablet' },
    { value: 'Eliquis 5mg Tablet', label: 'Eliquis 5mg Tablet' },
    { value: 'Eliwel 10mg Tablet', label: 'Eliwel 10mg Tablet' },
    { value: 'Elosone-HT Cream', label: 'Elosone-HT Cream' },
    { value: 'Eltroxin 25mcg Tablet', label: 'Eltroxin 25mcg Tablet' },
    { value: 'Emanzen-D Tablet', label: 'Emanzen-D Tablet' },
    { value: 'Embeta XR 25 Tablet', label: 'Embeta XR 25 Tablet' },
    { value: 'Embeta XR 50 Tablet', label: 'Embeta XR 50 Tablet' },
    { value: 'Emeset 4 Tablet', label: 'Emeset 4 Tablet' },
    { value: 'Emeset Injection 2ml', label: 'Emeset Injection 2ml' },
    { value: 'Emeset Syrup Juicy Lemon', label: 'Emeset Syrup Juicy Lemon' },
    { value: 'Emty Oral Solution', label: 'Emty Oral Solution' },
    { value: 'Encicarb Injection', label: 'Encicarb Injection' },
    { value: 'Enteroquinol 250mg Tablet', label: 'Enteroquinol 250mg Tablet' },
    { value: 'Envas 5 Tablet', label: 'Envas 5 Tablet' },
    { value: 'Enzar Forte  Tablet', label: 'Enzar Forte  Tablet' },
    { value: 'Enzoflam Tablet', label: 'Enzoflam Tablet' },
    { value: 'Enzoheal Tablet', label: 'Enzoheal Tablet' },
    { value: 'Enzomac Plus Tablet', label: 'Enzomac Plus Tablet' },
    { value: 'Enzomac Tablet', label: 'Enzomac Tablet' },
    { value: 'Epidosin Injection', label: 'Epidosin Injection' },
    { value: 'Eptoin Tablet', label: 'Eptoin Tablet' },
    { value: 'Eptus 25 Tablet', label: 'Eptus 25 Tablet' },
    { value: 'Equirex Tablet', label: 'Equirex Tablet' },
    { value: 'Erytop Gel', label: 'Erytop Gel' },
    { value: 'Esofag-D Capsule SR', label: 'Esofag-D Capsule SR' },
    { value: 'Estrabet 2 Tablet', label: 'Estrabet 2 Tablet' },
    { value: 'Etilaam 0.25 Tablet', label: 'Etilaam 0.25 Tablet' },
    { value: 'Etilaam Pro 20 Tablet', label: 'Etilaam Pro 20 Tablet' },
    { value: 'Etizola 0.25 Tablet', label: 'Etizola 0.25 Tablet' },
    { value: 'Etizola 0.5 Tablet', label: 'Etizola 0.5 Tablet' },
    { value: 'Etizola Beta 0.5 Tablet', label: 'Etizola Beta 0.5 Tablet' },
    { value: 'Etos MR Tablet', label: 'Etos MR Tablet' },
    { value: 'Etoshine 60 Tablet', label: 'Etoshine 60 Tablet' },
    { value: 'Etoshine 90 Tablet', label: 'Etoshine 90 Tablet' },
    { value: 'Etoshine MR Tablet', label: 'Etoshine MR Tablet' },
    { value: 'Etova 400 Tablet', label: 'Etova 400 Tablet' },
    { value: 'Etova-ER 400 Tablet', label: 'Etova-ER 400 Tablet' },
    { value: 'Etova-ER 600 Tablet', label: 'Etova-ER 600 Tablet' },
    { value: 'Etova-MR 400/4 Tablet', label: 'Etova-MR 400/4 Tablet' },
    { value: 'Eumosone Cream', label: 'Eumosone Cream' },
    { value: 'Eumosone-M Cream', label: 'Eumosone-M Cream' },
    { value: 'Evalon Cream', label: 'Evalon Cream' },
    { value: 'Evion LC Tablet', label: 'Evion LC Tablet' },
    { value: 'Eyemist Eye Drop', label: 'Eyemist Eye Drop' },
    { value: 'Ezact MR Tablet', label: 'Ezact MR Tablet' },
    { value: 'Faceclin Gel', label: 'Faceclin Gel' },
    { value: 'Famocid 40 Tablet', label: 'Famocid 40 Tablet' },
    { value: 'Farobact 200 Tablet', label: 'Farobact 200 Tablet' },
    { value: 'Faronem 200 Tablet', label: 'Faronem 200 Tablet' },
    { value: 'Faronem ER Tablet', label: 'Faronem ER Tablet' },
    { value: 'Fas 3 Kit', label: 'Fas 3 Kit' },
    { value: 'Febrex Plus Syrup', label: 'Febrex Plus Syrup' },
    { value: 'Febrex Plus Tablet', label: 'Febrex Plus Tablet' },
    { value: 'Febuget 40 Tablet', label: 'Febuget 40 Tablet' },
    { value: 'Feburic 40 Tablet', label: 'Feburic 40 Tablet' },
    { value: 'Febustat 40 Tablet', label: 'Febustat 40 Tablet' },
    { value: 'Febutaz 40 Tablet', label: 'Febutaz 40 Tablet' },
    { value: 'Femilon Tablet', label: 'Femilon Tablet' },
    { value: 'Fenak Plus Tablet', label: 'Fenak Plus Tablet' },
    { value: 'Ferinject Solution for Injection', label: 'Ferinject Solution for Injection' },
    { value: 'Fertisure M Tablet', label: 'Fertisure M Tablet' },
    { value: 'Finax Tablet', label: 'Finax Tablet' },
    { value: 'Finpecia Tablet', label: 'Finpecia Tablet' },
    { value: 'Flagyl 400 Tablet', label: 'Flagyl 400 Tablet' },
    { value: 'Flagyl Suspension', label: 'Flagyl Suspension' },
    { value: 'Flavedon MR Tablet', label: 'Flavedon MR Tablet' },
    { value: 'Flavospas Tablet', label: 'Flavospas Tablet' },
    { value: 'Flexabenz Plus Tablet SR', label: 'Flexabenz Plus Tablet SR' },
    { value: 'Flexon MR Tablet', label: 'Flexon MR Tablet' },
    { value: 'Flexon Tablet', label: 'Flexon Tablet' },
    { value: 'Flexura D Tablet', label: 'Flexura D Tablet' },
    { value: 'Flodart Plus Capsule PR', label: 'Flodart Plus Capsule PR' },
    { value: 'Flomist Nasal Spray', label: 'Flomist Nasal Spray' },
    { value: 'Flotral 10 Tablet PR', label: 'Flotral 10 Tablet PR' },
    { value: 'Flozen-AA Tablet', label: 'Flozen-AA Tablet' },
    { value: 'Fludac Capsule', label: 'Fludac Capsule' },
    { value: 'Fluka 150 Tablet', label: 'Fluka 150 Tablet' },
    { value: 'Flunarin 10 Tablet', label: 'Flunarin 10 Tablet' },
    { value: 'Flunil 20 Capsule', label: 'Flunil 20 Capsule' },
    { value: 'Flutibact Ointment', label: 'Flutibact Ointment' },
    { value: 'Fluticone-FT Nasal Spray', label: 'Fluticone-FT Nasal Spray' },
    { value: 'Flutivate Cream', label: 'Flutivate Cream' },
    { value: 'Folitrax 10 Tablet', label: 'Folitrax 10 Tablet' },
    { value: 'Folitrax 15 Tablet', label: 'Folitrax 15 Tablet' },
    { value: 'Folitrax 7.5 Tablet', label: 'Folitrax 7.5 Tablet' },
    { value: 'Folvite 5mg Tablet', label: 'Folvite 5mg Tablet' },
    { value: 'Foracort 0.5mg Respules 2ml', label: 'Foracort 0.5mg Respules 2ml' },
    { value: 'Foracort 200 Rotacap', label: 'Foracort 200 Rotacap' },
    { value: 'Foracort 400 Rotacap', label: 'Foracort 400 Rotacap' },
    { value: 'Foracort Inhaler 200', label: 'Foracort Inhaler 200' },
    { value: 'Foracort Inhaler 400', label: 'Foracort Inhaler 400' },
    { value: 'Forcan 150 Tablet', label: 'Forcan 150 Tablet' },
    { value: 'Forecox Tablet', label: 'Forecox Tablet' },
    { value: 'Fortwin 30mg Injection', label: 'Fortwin 30mg Injection' },
    { value: 'Forxiga 10mg Tablet', label: 'Forxiga 10mg Tablet' },
    { value: 'Fosirol Powder', label: 'Fosirol Powder' },
    { value: 'Fourderm Cream', label: 'Fourderm Cream' },
    { value: 'Franxit 0.5 mg/10 mg Tablet', label: 'Franxit 0.5 mg/10 mg Tablet' },
    { value: 'Freedase 30 Tablet', label: 'Freedase 30 Tablet' },
    { value: 'Frisium 10mg Tablet', label: 'Frisium 10mg Tablet' },
    { value: 'Frisium 5 Tablet', label: 'Frisium 5 Tablet' },
    { value: 'Fruselac Tablet', label: 'Fruselac Tablet' },
    { value: 'Fucibet Cream', label: 'Fucibet Cream' },
    { value: 'Fucidin Cream', label: 'Fucidin Cream' },
    { value: 'Furamist Nasal Spray', label: 'Furamist Nasal Spray' },
    { value: 'Gabaneuron 100 Tablet', label: 'Gabaneuron 100 Tablet' },
    { value: 'Gabaneuron NT Tablet', label: 'Gabaneuron NT Tablet' },
    { value: 'Gabaneuron Tablet', label: 'Gabaneuron Tablet' },
    { value: 'Gabantin 100 Capsule', label: 'Gabantin 100 Capsule' },
    { value: 'Gabantin-NT Tablet', label: 'Gabantin-NT Tablet' },
    { value: 'Gabapin 100 Tablet', label: 'Gabapin 100 Tablet' },
    { value: 'Gabapin 300 Capsule', label: 'Gabapin 300 Capsule' },
    { value: 'Gabapin ME Tablet', label: 'Gabapin ME Tablet' },
    { value: 'Gabapin NT 100 Tablet', label: 'Gabapin NT 100 Tablet' },
    { value: 'Gabapin NT Tablet', label: 'Gabapin NT Tablet' },
    { value: 'Galvus 50mg Tablet', label: 'Galvus 50mg Tablet' },
    { value: 'Galvus Met 50mg/1000mg Tablet', label: 'Galvus Met 50mg/1000mg Tablet' },
    { value: 'Galvus Met 50mg/500mg Tablet', label: 'Galvus Met 50mg/500mg Tablet' },
    { value: 'Ganaton Tablet', label: 'Ganaton Tablet' },
    { value: 'Ganaton Total Capsule SR', label: 'Ganaton Total Capsule SR' },
    { value: 'Gardasil Vaccine', label: 'Gardasil Vaccine' },
    { value: 'Gardenal 30 Tablet', label: 'Gardenal 30 Tablet' },
    { value: 'Gardenal 60 Tablet', label: 'Gardenal 60 Tablet' },
    { value: 'GB 29 Total Tablet', label: 'GB 29 Total Tablet' },
    { value: 'Gemer 0.5 Tablet PR', label: 'Gemer 0.5 Tablet PR' },
    { value: 'Gemer 1 Tablet PR', label: 'Gemer 1 Tablet PR' },
    { value: 'Gemer 2 Tablet PR', label: 'Gemer 2 Tablet PR' },
    { value: 'Genteal Eye Drop', label: 'Genteal Eye Drop' },
    { value: 'Gerbisa Tablet', label: 'Gerbisa Tablet' },
    { value: 'Gestapro Tablet', label: 'Gestapro Tablet' },
    { value: 'Gibtulio 25mg Tablet', label: 'Gibtulio 25mg Tablet' },
    { value: 'Ginette 35 Tablet', label: 'Ginette 35 Tablet' },
    { value: 'Glimestar-M 1 Tablet PR', label: 'Glimestar-M 1 Tablet PR' },
    { value: 'Glimestar-M 2 Tablet PR', label: 'Glimestar-M 2 Tablet PR' },
    { value: 'Glimestar-PM2 Tablet ER', label: 'Glimestar-PM2 Tablet ER' },
    { value: 'Glizid-M Tablet', label: 'Glizid-M Tablet' },
    { value: 'Gluconorm G2 Tablet PR', label: 'Gluconorm G2 Tablet PR' },
    { value: 'Gluconorm SR 500mg Tablet', label: 'Gluconorm SR 500mg Tablet' },
    { value: 'Gluconorm-G 1 Tablet PR', label: 'Gluconorm-G 1 Tablet PR' },
    { value: 'Glucored Forte Tablet', label: 'Glucored Forte Tablet' },
    { value: 'Glucreta 10mg Tablet', label: 'Glucreta 10mg Tablet' },
    { value: 'Glyciphage SR 500mg Tablet', label: 'Glyciphage SR 500mg Tablet' },
    { value: 'Glycomet 1gm Tablet SR', label: 'Glycomet 1gm Tablet SR' },
    { value: 'Glycomet 500 SR Tablet', label: 'Glycomet 500 SR Tablet' },
    { value: 'Glycomet Tablet', label: 'Glycomet Tablet' },
    { value: 'Glycomet Trio 2 Tablet SR', label: 'Glycomet Trio 2 Tablet SR' }
]

export default medicineData;