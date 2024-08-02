export class DogsService {
  async getBreeds(): Promise<string[]> {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    return Object.keys(data.message);
  }

  async getImageSrc(breed: string): Promise<string> {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`,
    );
    const data = await response.json();
    return data.message;
  }
}

export default new DogsService();
