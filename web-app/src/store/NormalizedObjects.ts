interface NormalizedObjects<T> {
  byId: { [id: string]: T };
  allIds: string[];
}

export default NormalizedObjects