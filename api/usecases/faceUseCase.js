const euclideanDistance = (arr1, arr2) => {
  if (arr1.length !== arr2.length) throw new Error("Arrays must have the same length");
  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    sum += Math.pow(arr1[i] - arr2[i], 2);
  }
  return Math.sqrt(sum);
};

class FaceUseCase {
  constructor(faceRepository, userRepository) {
    this.faceRepository = faceRepository;
    this.userRepository = userRepository;
    this.matchThreshold = 0.6;
  }

  async registerFace(login, descriptor) {
    const user = await this.userRepository.findUserByLogin(login);
    if (!user) {
      throw new Error("User not found for given login");
    }
    const faceData = await this.faceRepository.createFaceData(user.id, descriptor);
    return faceData;
  }

  async verifyFace({ login, descriptor }) {
    const user = await this.userRepository.findUserByLogin(login);
    if (!user) {
      throw new Error("User not found for given login");
    }

    const latestFaceData = await this.faceRepository.getLatestFaceDataByUser(user.id);
    if (!latestFaceData) {
      throw new Error("No face data found for this user");
    }

    const distance = euclideanDistance(latestFaceData.descriptor, descriptor);
    
    if (distance <= this.matchThreshold) {
      return { user, distance };
    } else {
      throw new Error("No matching face found for the user");
    }
  }
}

module.exports = FaceUseCase;
