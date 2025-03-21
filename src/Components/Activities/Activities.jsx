import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const fallbackImage = "/assets/fallback_image.png";

  useEffect(() => {
    axios
      .get("https://rrn24.techchantier.site/malingo/public/api/api/activity")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {activities.map((activity) => (
        <Card key={activity.id} className="shadow-lg rounded-lg overflow-hidden">
          <img
            src={activity.image || fallbackImage}
            alt={activity.title}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-4">
            <CardTitle className="text-xl font-bold">{activity.title}</CardTitle>
            <p className="text-gray-700">{activity.description}</p>
            <div className="mt-2">
              <a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Click here
              </a>
            </div>
            <Button
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => (window.location.href = "/Login")}
            >
              Join
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Activities;
