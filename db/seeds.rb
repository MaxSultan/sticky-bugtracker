5.times do 
    Project.create(
    name:Faker::Hacker.noun 
  )
end 

30.times do Bug.create(
  project_id: rand(3),
  title: Faker::Hacker.noun,
  description: Faker::Hacker.say_something_smart,
  steps: Faker::String.random,
  result: Faker::Verb.past,
  assignedTo: Faker::Name.name,
  severity: Faker::Military.army_rank,
  screenShots: Faker::Avatar.image(slug: "my-own-slug", size: "50x50", format: "jpg"),
  startDate: Faker::Time.between(from: DateTime.now - 1, to: DateTime.now),
  dueDate: Faker::Time.between(from: DateTime.now - 1, to: DateTime.now + 22),
)
  
end 

40.times do Chat.create(
  bug_id: rand(9),
  username: Faker::Name.name,
  content: Faker::String.random,
  postTime:Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) ,
)
end

puts 'please work'