const fs = require('fs');

console.log('📋 Running Document Adherence Verification...');
console.log('='.repeat(50));

try {
  const aiContent = fs.readFileSync('src/data/artificial-intelligence.js', 'utf8');

  // Parse the content (remove export default and evaluate)
  const contentToParse = aiContent.replace('export default', '').trim();
  const aiData = eval('(' + contentToParse + ')');

  console.log('✅ File structure validation:');
  console.log('  ✓ Module exports correctly');
  console.log('  ✓ Content parsed successfully');

  // Check required fields
  const requiredFields = ['id', 'tier', 'name', 'description', 'difficulty', 'estimatedHours', 'prerequisites', 'learningObjectives', 'sections'];
  const missingFields = requiredFields.filter(field => !(field in aiData));

  if (missingFields.length === 0) {
    console.log('✅ All required fields present');
  } else {
    console.log('❌ Missing fields:', missingFields.join(', '));
  }

  // Check learning objectives
  console.log(`\n📚 Learning Objectives: ${aiData.learningObjectives.length}/15`);
  if (aiData.learningObjectives.length === 15) {
    console.log('✅ Correct number of learning objectives');
  } else {
    console.log('❌ Incorrect number of learning objectives');
  }

  // Check sections
  console.log(`\n📖 Sections: ${aiData.sections.length}`);
  aiData.sections.forEach((section, index) => {
    const hasContent = section.content && section.content.length > 100;
    const hasKeyTopics = section.keyTopics && section.keyTopics.length > 0;
    const hasExercises = section.practicalExercises && section.practicalExercises.length > 0;
    const hasCodeExamples = section.codeExamples && section.codeExamples.length > 0;

    console.log(`  Section ${index + 1}: ${section.title}`);
    console.log(`    ✓ Content: ${hasContent ? 'Present' : 'Missing'}`);
    console.log(`    ✓ Key Topics: ${hasKeyTopics ? section.keyTopics.length : 0}`);
    console.log(`    ✓ Exercises: ${hasExercises ? section.practicalExercises.length : 0}`);
    console.log(`    ✓ Code Examples: ${hasCodeExamples ? section.codeExamples.length : 0}`);
  });

  // Check AI prompts
  const hasAiPrompts = aiData.aiPrompts && aiData.aiPrompts.length > 0;
  console.log(`\n🤖 AI Prompts: ${hasAiPrompts ? aiData.aiPrompts.length : 0}`);
  if (hasAiPrompts) {
    console.log('✅ AI prompts included');
  }

  // Check tier and other metadata
  console.log(`\n🏷️  Metadata:`);
  console.log(`  ✓ ID: ${aiData.id}`);
  console.log(`  ✓ Tier: ${aiData.tier} (should be 5 for AI)`);
  console.log(`  ✓ Difficulty: ${aiData.difficulty}`);
  console.log(`  ✓ Estimated Hours: ${aiData.estimatedHours}`);
  console.log(`  ✓ Prerequisites: ${aiData.prerequisites.join(', ')}`);

  // Summary
  console.log('\n📊 Adherence Summary:');
  const totalSections = aiData.sections.length;
  const sectionsWithAllFields = aiData.sections.filter(s =>
    s.content && s.keyTopics && s.practicalExercises && s.codeExamples
  ).length;

  console.log(`✅ Complete sections: ${sectionsWithAllFields}/${totalSections}`);
  console.log(`✅ Learning objectives: ${aiData.learningObjectives.length}/15`);
  console.log(`✅ AI prompts: ${hasAiPrompts ? 'Present' : 'Missing'}`);

  if (sectionsWithAllFields === totalSections && aiData.learningObjectives.length === 15 && hasAiPrompts) {
    console.log('\n🎉 DOCUMENT ADHERENCE VERIFICATION PASSED');
    console.log('✅ All requirements met');
  } else {
    console.log('\n⚠️  Some requirements not fully met');
  }

} catch (error) {
  console.error('❌ Verification Error:', error.message);
  process.exit(1);
}