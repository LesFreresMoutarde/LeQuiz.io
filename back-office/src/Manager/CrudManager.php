<?php


namespace App\Manager;


use App\Repository\CategoryRepository;
use App\Repository\QuestionTypeRepository;

class CrudManager
{
    /**
     * @var CategoryRepository
     */
    private CategoryRepository $categoryRepository;
    /**
     * @var QuestionTypeRepository
     */
    private QuestionTypeRepository $questionTypeRepository;

    public function __construct(CategoryRepository $categoryRepository, QuestionTypeRepository $questionTypeRepository) {
        $this->categoryRepository = $categoryRepository;
        $this->questionTypeRepository = $questionTypeRepository;
    }

    public function getCategories()
    {
        return $this->categoryRepository->findBy([], ['label' => 'ASC']);
    }

    public function getQuestionTypes()
    {
        return $this->questionTypeRepository->findBy([], ['label' => 'ASC']);
    }
}
