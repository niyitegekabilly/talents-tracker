
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { disciplineStats, disciplineColors } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DisciplineDistribution() {
  const data = disciplineStats.map(item => ({
    name: item.discipline,
    value: item.count,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Talent Distribution by Discipline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={disciplineColors[entry.name as keyof typeof disciplineColors]} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Talents`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
