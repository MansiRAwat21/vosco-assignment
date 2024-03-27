import axios from 'axios';

interface Activity {
  activity: string;
  type: string;
  participants: number;
}

const fetchActivities = async (): Promise<Activity[]> => {
  const response = await axios.get<Activity>('https://www.boredapi.com/api/activity');
  return response.data;
};

export default fetchActivities;
