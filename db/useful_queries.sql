SELECT 
  cc.id, 
  cc.class_name, 
  cc.class_location, 
  cc.day_of_week, 
  cc.start_time, 
  cc.end_time, 
  cc.instructor, 
  cl.level_description,
  s.school_name,
  cat.category_name
FROM 
  circus_classes cc
JOIN 
  class_level cl ON cc.level_id = cl.id
JOIN 
  school s ON cc.school_id = s.id
JOIN 
  class_category cat ON cc.category_id = cat.id;