// import authApi from '../api/authApi';

const checkToken: {
  isAuthenticated: () => {
    userId: string;
    token: string | null;
    expiration: string;
  } | null;
} = {
  isAuthenticated: () => {
    const storedData = JSON.parse(localStorage.getItem('userData') as string) as {
      userId: string;
      token: string | null;
      expiration: string;
    };
    if (storedData === null || !storedData.token) return null;
    return storedData;
    //   try {
    //     const res = await authApi.verifyToken();
    //     return res.user;
    //   } catch {
    //     return false;
    //   }
  }
};

export default checkToken;
