-- atlas:delimiter \n\n\n
CREATE TRIGGER IF NOT EXISTS tg_captions_updated_at
AFTER UPDATE
ON captions FOR EACH ROW
BEGIN
  UPDATE captions SET updated_at = current_timestamp
  WHERE id = old.id;
END;
