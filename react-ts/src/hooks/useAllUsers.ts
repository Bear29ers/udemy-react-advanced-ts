// 全ユーザー一覧を取得するカスタムフック
import { useState } from 'react';
import { UserProfile } from '../types/userProfile';
import axios from 'axios';
import { User } from '../types/api/user';

export const useAllUsers = () => {
  const [userProfileList, setUserProfileList] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios.get<Array<User>>('https://jsonplaceholder.typicode.com/users').then((res) => {
      const userData = res.data.map((user) => ({
        id: user.id,
        name: `${user.name}(${user.username})`,
        email: user.email,
        address: `${user.address.city} ${user.address.suite} ${user.address.street}`
      }));
      setUserProfileList(userData);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  return { getUsers, userProfileList, loading, error };
};