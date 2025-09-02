export interface Communities  {
    name: string,
    city: string,
    name_ar: string,
    id: string,
    location_coordinates: string,
    document_id: string,
    checksum: string,
    docuname: string
}
export interface Developer  {
    name: string,
    city: string,
    name_ar: string,
    id: string,
    featured: string,
    ordered: string,
    document_id: string,
    checksum: string,
    docuname: string
}
export interface Project  {
    projectID: string;
    propertyName: string; 
    ar_name:string;
    featured:string;
    hideprice:string;
    create_dt:string;
    modify_dt:string;
    country:string;
    city_id:string;
    community_id:string;
    subcommunity_id:string;
    city_name:string;
    city_name_ar:string;
    community_name:string;
    community_name_ar:string;
    subcommunity_name:string;
    subcommunity_name_ar:string;
    developer_name:string;
    project_slug:string;
}

export type DocumentItem = {
    id: string;
    name: string;
    create_id: string;
    create_dt: string;
    modify_id: string | null;
    modify_dt: string | null;
    status: string;
    module: string;
    element_id: string;
    document_type: string;
    size: string;
    type: string;
    path: string;
    checksum: string;
    upload_ip: string;
    downloads: string;
    delete_notes: string | null;
    position: string;
    label: string | null;
    category: string | null;
    facilities: string | null;
    keywords: string | null;
    description: string | null;
    main: string;
};

export type MediaCategories = {
    [key: string]: DocumentItem[];
};

export type FloorPlans = {
    [key: string]: FloorPlanItem[];
};

export type FloorPlanItem = {
    id: string;
    create_dt: string;
    create_id: string;
    modify_dt: string;
    modify_id: string;
    status: string;
    floor_down: string;
    floor_up: string;
    project_id: string;
    bedrooms: string;
    bedroom_1: string;
    metrics: string;
    size: string;
    type: string;
    name: string;
    price: string;
    position: string;
    parking_places: string | null;
    maids_room: string | null;
    virtual_tour: string;
    title: string;
    matterport: string;
    store_room: string | null;
    balcony: string | null;
    total_no: string;
    driverroom: string | null;
    laundryroom: string | null;
    utilityroom: string | null;
    nannyroom: string | null;
    swimmingpool: string | null;
    jacuzzi: string | null;
    gym: string | null;
    backyard: string | null;
    frontyard: string | null;
    rooftopfields: string | null;
    youtube: string;
    studyroom: string | null;
    balconysize: string;
    gardensize: string;
    plotsize: string;
    roofsize: string;
    walkinwardrobe: string | null;
    garden: string | null;
    stairs: string | null;
    ensuitenumber: string;
    balconynumber: string;
    parkingnumber: string;
    openkitchen: string;
    coveredparking: string | null;
    terrace: string;
    middle_unit: string | null;
    corner_unit: string | null;
    views: string | null;
    media: UnitMedia[];
    label:string;
    key:string;
};

export interface UnitMedia {
    main: string;
    facilities: string;
    name: string;
    path: string;
};


export interface ProjectDetails {
    main: Project[];
    media: MediaCategories[];
    floorplans: FloorPlans[];
    name: string;
    __newslugname__: string;
    ar_name: string;
    status: string;
    developer: string;
    property_managament: string;
    price_min: string;
    price_max: string;
    area_range_min: string;
    area_range_max: string;
    completion_month: string;
    completion_year: string;
    launch_date_month: string;
    launch_date_year: string;
    project_status: string;
    off_plan: string;
    off_price: string;
    rent_sale: string;
    master_plan_size: string;
    master_plan_area: string;
    master_plan_designer: string;
    residential_foot_print: string;
    sports_club_size: string;
    project_depth: string;
    beach_length: string;
    maintenance_fee: string;
    no_of_floors: string;
    finishing_type: string[]; 
    phase_parent_isparent: string;
    coords_coords: string;
    coords_coords_map_searchbox: string;
    community_community: string;
    coords_address_1: string;
    coords_address_2: string;
    xml_location: string;
    files: Record<string, string[]>;
    floorListTable_length: string;
    floorlistpositions: Record<string, string>;
    youtube: string;
    project_description: string;
    virtual: string;
    youtube_ar: string;
    ar_project_description: string;
    payment_plans_order: string[];
    payment_plans_year: string[];
    payment_plans_type: string[];
    payment_plans_percentage: string[];
    payment_plans_date: string[];
    payment_plans_days: string[];
    payment_plans_maintenance: string[];
    payment_plans_clubhouse: string[];
    payment_plans_delivery: string[];
    payment_plans_show: string[];
    villa_no_of_apartment: string;
    villa_price_min: string;
    villa_price_max: string;
    villa_size_sqm_min: string;
    villa_size_sqm_max: string;
    // similar fields for apartments, townhouses, etc.
    offertitle: string;
    offertext: string;
    offervideo: string;
    offer_payment_frequency: string;
    offer_no_of_years: string;
    offer_downpayment: string;
    project_location_coordinates: string;
    marketadditionaltext: string;
    marketfocus_usp1: string;
    marketfocus_usp2: string;
    marketfocus_usp3: string;
    marketfocus_usp4: string;
    featureslider: string;
    marketfeatured: string;
    ref_no: string;
    referred_by: string;
    reffered_date: string;
    property_code: string;
    cc_work_order_to: string;
    private_remarks: string;
    contact_name: string;
    contact_phone: string;
    contact_description: string;
    developer_contact_person_name: string;
    developer_contact_person_phone: string;
    construction_title: string;
    construction_description: string;
    construction_video: string;
    coords_country: string;
    coords_city: string;
    property_type1: string[];
    property_type: string[];
    subcommunity_subcommunity: string;
    available_bedrooms: string[];
    checksum: string;
    id: string;
    facilities: string[];
    amenities: string[];
    file_attribute: Record<string, string>;
    mainimage_gallery_69_images_85_21ddb2ea9750461f95fce0d8861dff5d: string;
    // other image keys
    price_per_square_meter: string;
    project_availability1: string[];
    payment_title: string;
    payment_text: string;
    payment_video: string;
    payment_frequency: string;
    payment_no_of_installments: string;
    payment_downpayment: string;
    payment_after_3_months: string;
    payment_after_6_months: string;
    featured: string;
    unitfeatured: string;
    datatable_new_length: string;
    updateprice: string;
    construction_status: string;
    en_project_description: string;
    marketadditionaltext_ar: string;
    unitstatus: string;
    featured_date: string;
    hideprice: string;
    brochure_url: string;
};