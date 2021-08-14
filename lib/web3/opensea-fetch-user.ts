import { DEFAULT_USER, OPENSEA_BASE_URL, OPENSEA_ASSETS, OPENSEA_API_KEY } from '@lib/constants';

export async function fetchUser(account: string) {
  let user = DEFAULT_USER;
  const updateUser = (match: any) => {
    user.address = match?.owner?.address;
    user.name = match?.owner?.user?.username;
    user.username = match?.owner?.user?.username;
    user.discord = match?.owner?.discord_id;
    user.avatar = match?.owner?.profile_img_url;
    user.avatar_url = match?.owner?.profile_img_url;
    return user;
  };
  const url = `${
    OPENSEA_BASE_URL + OPENSEA_ASSETS
  }?owner=${account}&order_direction=desc&offset=0&limit=50`;
  const options = { method: 'GET', headers: { 'X-API-KEY': OPENSEA_API_KEY } };
  const fetcher = await window.fetch(url, options);
  const response = await fetcher.json();
  const locate = response.assets.find((item: any) => {
    let address = item.owner.address.toString().toLowerCase();
    let sanitized = account.toString().toLowerCase();
    return address === sanitized;
  });
  return updateUser(locate);
}
