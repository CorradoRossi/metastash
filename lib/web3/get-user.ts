import { OPENSEA_BASE_URL, OPENSEA_ASSETS } from '../constants';

export async function fetchUser(account: string) {
  let user = {
    address: '',
    name: '',
    username: '',
    discord: '',
    avatar: '',
    avatar_url: ''
  };
  const updatedUser = (found: any) => {
    user.address = found?.owner?.address;
    user.name = found?.owner?.user?.username;
    user.username = found?.owner?.user?.username;
    user.discord = found?.owner?.discord_id;
    user.avatar = found?.owner?.profile_img_url;
    user.avatar_url = found?.owner?.profile_img_url;
    return user;
  };
  const url = `${
    OPENSEA_BASE_URL + OPENSEA_ASSETS
  }?owner=${account}&order_direction=desc&offset=0&limit=50`;
  const options = { method: 'GET' };
  const fetcher = await window.fetch(url, options);
  const response = await fetcher.json();
  const cycle = response.assets.find((item: any) => {
    let sanitizedItemAddress = item.owner.address.toString().toLowerCase();
    let sanitizedAccount = account.toString().toLowerCase();
    return sanitizedItemAddress === sanitizedAccount;
  });
  return updatedUser(cycle);
}
