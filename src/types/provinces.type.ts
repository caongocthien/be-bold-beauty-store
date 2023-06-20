export interface Provinces {
  name: string
  code: number
  codename: string
  division_type: string
  phone_code: number
  districts: Districts[]
}

export interface Districts {
  name: string
  code: number
  codename: string
  division_type: string
  short_codename: string
  wards: Ward[]
}
export interface Ward {
  name: string
  code: number
  codename: string
  division_type: string
  short_codename: string
}
