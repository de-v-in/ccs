interface ITokenMeta {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  external_url: string;
  properties: ITokenroperties;
  attributes: ITokenAttribute[];
  collection: ITokenCollection;
}

interface ITokenroperties {
  files: ITokenMedia[];
  category: string;
  creators: ITokenCreator[];
}

interface ITokenMedia {
  uri: string;
  type: string;
}

interface ITokenCreator {
  address: string;
  share: number;
}

interface ITokenAttribute {
  trait_type: string;
  value: string;
}

interface ITokenCollection {
  name: string;
  family: string;
}
